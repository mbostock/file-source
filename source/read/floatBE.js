function readFloatBE(buffer) {
  return buffer.length < 4 ? null : buffer.readFloatBE(0);
}

module.exports = function() {
  return this.read(4).then(readFloatBE);
};
