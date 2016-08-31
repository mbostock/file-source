var fs = require("fs"),
    close = require("./close"),
    step = require("./step");

module.exports = function(source, length, callback) {
  source._active = true;

  // Increase the buffer size, if it’s not already big enough.
  if (source._buffer.length < length) source._buffer = new Buffer(1 << Math.ceil(Math.log(length) / Math.LN2));

  // Now read the requested bytes into the buffer!
  // If an error occurs, or EOF is reached, automatically close the file.
  (function reread(offset) {
    fs.read(source._fd, source._buffer, offset, length - offset, source._position, function(error, readLength) {
      source._active = false;
      if (error || !readLength) return close(source, afterclose.bind(null, source, error, !error && offset ? source._buffer.slice(0, offset) : null, callback));
      source._position += readLength, offset += readLength;
      if (offset < length) return reread(offset);
      step(source);
      callback(null, source._buffer.slice(0, length));
    });
  })(0);
  return source;
};

function afterclose(source, error, buffer, callback) {
  callback(source._error = error, buffer);
}
