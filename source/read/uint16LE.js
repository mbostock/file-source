function readUInt16LE(buffer) {
  return buffer.length < 2 ? null : buffer.readUInt16LE(0);
}

module.exports = function() {
  return this.read(2).then(readUInt16LE);
};
