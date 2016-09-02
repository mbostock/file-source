var Source = require("../index"),
    clear = require("./clear");

function BufferedSource(source, size) {
  if (isNaN(size) || (size |= 0) <= 0) throw new Error("invalid size");
  this._source = source;
  this._size = size;
  clear(this);
}

var prototype = BufferedSource.prototype = Object.create(Source.prototype);
prototype.constructor = BufferedSource;
prototype.open = require("./open");
prototype.read = require("./read");
prototype.skip = require("./skip");
prototype.seek = require("./seek");
prototype.close = require("./close");

module.exports = BufferedSource;
