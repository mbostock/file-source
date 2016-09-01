function readInt32BE(buffer) {
  return buffer.length < 4 ? null : buffer.readInt32BE(0);
}

module.exports = function() {
  return this.read(4).then(readInt32BE);
};
