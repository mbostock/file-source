var fs = require("fs");

module.exports = function(length) {
  if (isNaN(length) || (length |= 0) < 0) throw new Error("invalid length");
  if (this._fd == null) throw new Error("not open");
  if (this._active) throw new Error("concurrent operation");
  this._active = true;
  return new Promise((resolve, reject) => {
    var source = this, buffer = new Buffer(length);
    (function read(offset) {
      fs.read(source._fd, buffer, offset, length - offset, source._position, function(error, length1) {
        if (error) return source._active = false, reject(error);
        if (!length1) return source._active = false, resolve(buffer.slice(0, offset));
        source._position += length1;
        if ((offset += length1) < length) return read(offset);
        source._active = false, resolve(buffer);
      });
    })(0);
  });
};
