module.exports = function(position) {
  this._position = Math.max(0, position | 0);
  return this;
};
