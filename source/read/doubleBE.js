function readDoubleBE(buffer) {
  return buffer.length < 8 ? null : buffer.readDoubleBE(0);
}

module.exports = function() {
  return this.read(8).then(readDoubleBE);
};
