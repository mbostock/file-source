function readInt16LE(buffer) {
  return buffer.length < 2 ? null : buffer.readInt16LE(0);
}

module.exports = function() {
  return this.read(2).then(readInt16LE);
};
