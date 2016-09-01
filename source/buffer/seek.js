var clear = require("./clear");

module.exports = function(position) {
  if (this._source._active) throw new Error("concurrent operation");
  this._source.seek(position);
  return clear(this);
};
