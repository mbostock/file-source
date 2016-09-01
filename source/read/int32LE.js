function readInt32LE(buffer) {
  return buffer.length < 4 ? null : buffer.readInt32LE(0);
}

module.exports = function() {
  return this.read(4).then(readInt32LE);
};
