function readUInt16BE(buffer) {
  return buffer.length < 2 ? null : buffer.readUInt16BE(0);
}

module.exports = function() {
  return this.read(2).then(readUInt16BE);
};
