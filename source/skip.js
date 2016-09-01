module.exports = function(length) {
  this._position = Math.max(0, this._position + (length | 0));
  return this;
};
