var empty = new Buffer(0);

module.exports = function(source) {
  source._offset = 0;
  source._buffer = empty;
  return source;
};
