module.exports = function(position) {
  if (this._active) throw new Error("concurrent operation");
  this._position = Math.max(0, position | 0);
  return this;
};
