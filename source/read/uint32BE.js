function readUInt32BE(buffer) {
  return buffer.length < 4 ? null : buffer.readUInt32BE(0);
}

module.exports = function() {
  return this.read(4).then(readUInt32BE);
};
