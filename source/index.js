function Source() {
  this._task = Promise.resolve();
  this._fd = null;
  this._position = 0;
  this._skip = 0;
  this._seek = null;
}

var prototype = Source.prototype;
prototype.open = require("./open");
prototype.read = require("./read");
prototype.seek = require("./seek");
prototype.skip = require("./skip");
prototype.close = require("./close");

module.exports = Source;
