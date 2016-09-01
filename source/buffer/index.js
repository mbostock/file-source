var Source = require("../index"),
    clear = require("./clear");

function BufferedSource(source, size) {
  if (isNaN(size) || (size |= 0) <= 0) throw new Error("invalid size");
  this._source = source;
  this._size = size;
  clear(this);
}

BufferedSource.prototype = Object.create(Source.prototype);
BufferedSource.prototype.read = require("./read");
BufferedSource.prototype.skip = require("./skip");
BufferedSource.prototype.seek = require("./seek");

BufferedSource.prototype.open = function(path) {
  if (this._source._active) throw new Error("concurrent operation");
  return clear(this)._source.open(path).then(() => this);
};

BufferedSource.prototype.close = function() {
  if (this._source._active) throw new Error("concurrent operation");
  return clear(this)._source.close().then(() => this);
};

module.exports = BufferedSource;
