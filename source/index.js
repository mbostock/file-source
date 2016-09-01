function Source() {
  this._fd = null;
  this._position = 0;
}

Source.prototype.open = require("./open");
Source.prototype.read = require("./read");
Source.prototype.seek = require("./seek");
Source.prototype.skip = require("./skip");
Source.prototype.close = require("./close");

module.exports = Source;
