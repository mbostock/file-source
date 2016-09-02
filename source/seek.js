module.exports = function(position) {
  return this._skip = 0, this._seek = Math.max(0, position | 0), this;
};
