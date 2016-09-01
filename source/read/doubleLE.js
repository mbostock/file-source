function readDoubleLE(buffer) {
  return buffer.length < 8 ? null : buffer.readDoubleLE(0);
}

module.exports = function() {
  return this.read(8).then(readDoubleLE);
};
