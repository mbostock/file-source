var clear = require("./clear");

module.exports = function() {
  if (this._source._active) throw new Error("concurrent operation");
  return clear(this)._source.close().then(() => this);
};
