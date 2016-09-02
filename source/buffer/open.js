var clear = require("./clear");

module.exports = function(path) {
  if (this._source._active) throw new Error("concurrent operation");
  return clear(this)._source.open(path).then(() => this);
};
