function readInt8(buffer) {
  return buffer.length < 1 ? null : buffer.readInt8(0);
}

module.exports = function() {
  return this.read(1).then(readInt8);
};
