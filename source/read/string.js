module.exports = function(length, encoding) {
  if (isNaN(length) || (length |= 0) < 0) throw new Error("invalid length");
  return this.read(length).then(function(buffer) {
    return buffer.toString(encoding);
  });
};
