var fs = require("fs");

function source() {
  return new Source;
}

function Source() {
  this._fd = null;
  this._position = 0;
}

Source.prototype.open = function(path) {
  return new Promise((resolve, reject) => {
    if (this._fd != null) return reject(new Error("already open"));
    this._fd = -1;
    fs.open(path, "r", (error, fd) => {
      if (error) return reject(error);
      this._fd = fd;
      this._position = 0;
      resolve(this);
    });
  });
};

Source.prototype.read = function(length) {
  return new Promise((resolve, reject) => {
    var source = this, buffer = new Buffer(length), position = source._position;
    source._position += length;
    (function read(offset) {
      fs.read(source._fd, buffer, offset, length - offset, position, function(error, length1) {
        if (error) return reject(error);
        if (!length1) return resolve(offset ? buffer.slice(0, offset) : null);
        position += length1;
        if ((offset += length1) < length) return read(offset);
        resolve(buffer);
      });
    })(0);
  });
};

Source.prototype.close = function() {
  return new Promise((resolve, reject) => {
    if (this._fd == null) return reject(new Error("already closed"));
    var fd = this._fd;
    this._fd = null;
    fs.close(fd, function(error) {
      if (error) return reject(error);
      this._fd = null;
      resolve(null);
    });
  });
};

exports.open = function(path) {
  return source().open(path);
};

exports.source = source;

source.prototype = Source.prototype;
