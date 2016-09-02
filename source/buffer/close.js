var serialize = require("../serialize"),
    clear = require("./clear");

module.exports = function() {
  return serialize(this, () => this._source.close().then(() => clear(this)));
};
