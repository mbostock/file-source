function readUInt8(buffer) {
  return buffer.length < 1 ? null : buffer.readUInt8(0);
}

module.exports = function() {
  return this.read(1).then(readUInt8);
};
