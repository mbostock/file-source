module.exports = function(length) {
  if (this._active) throw new Error("concurrent operation");
  this._position = Math.max(0, this._position + (length | 0));
  return this;
};
