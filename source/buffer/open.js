var serialize = require("../serialize");

module.exports = function(path) {
  return serialize(this, () => this._source.open(path).then(() => this));
};
