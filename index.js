var fs = require("fs");

function Source(fd) {
  this._fd = fd;
  this._position = 0;
}

Source.prototype.read = function(length) {
  return new Promise((resolve, reject) => {
    var source = this, buffer = new Buffer(length);
    (function read(offset) {
      fs.read(source._fd, buffer, offset, length - offset, source._position, function(error, length1) {
        if (error) return reject(error);
        if (!length1) return resolve(offset ? buffer.slice(0, offset) : null);
        source._position += length1;
        if ((offset += length1) < length) return read(offset);
        resolve(buffer);
      });
    })(0);
  });
};

Source.prototype.close = function() {
  return new Promise((resolve, reject) => {
    fs.close(this._fd, function(error) {
      if (error) return reject(error);
      resolve(null);
    });
  });
};

exports.open = function(path) {
  return new Promise((resolve, reject) => {
    fs.open(path, "r", (error, fd) => {
      if (error) return reject(error);
      resolve(new Source(fd, 0));
    });
  });
};

exports.source = Source;
