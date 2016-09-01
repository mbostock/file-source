function readFloatLE(buffer) {
  return buffer.length < 4 ? null : buffer.readFloatLE(0);
}

module.exports = function() {
  return this.read(4).then(readFloatLE);
};
