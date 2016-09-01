module.exports = function(length) {
  if ((length |= 0) <= 0 || length > 6) throw new Error("invalid length");
  return this.read(length).then(function(buffer) {
    return buffer.length < length ? null : buffer.readUIntBE(0, length);
  });
};
