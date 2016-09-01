function readInt16BE(buffer) {
  return buffer.length < 2 ? null : buffer.readInt16BE(0);
}

module.exports = function() {
  return this.read(2).then(readInt16BE);
};
