var empty = new Buffer(0);

module.exports = function(source) {
  source._position = 0; // Start of buffer.
  source._offset = 0; // Number of “read” bytes in the buffer.
  source._buffer = empty;
  return source;
};
