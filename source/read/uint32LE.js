function readUInt32LE(buffer) {
  return buffer.length < 4 ? null : buffer.readUInt32LE(0);
}

module.exports = function() {
  return this.read(4).then(readUInt32LE);
};
