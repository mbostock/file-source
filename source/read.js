var fs = require("fs"),
    serialize = require("./serialize");

module.exports = function(length) {
  if (isNaN(length) || (length |= 0) < 0) throw new Error("invalid length");
  var skip = this._skip, seek = this._seek;
  this._skip = 0, this._seek = null;
  return serialize(this, () => new Promise((resolve, reject) => {
    if (this._fd == null) return reject(new Error("not open"));
    var source = this, buffer = new Buffer(length);
    if (seek != null) source._position = seek;
    else source._position += skip;
    (function read(offset) {
      fs.read(source._fd, buffer, offset, length - offset, source._position, function(error, length1) {
        if (error) return reject(error);
        if (!length1) return resolve(buffer.slice(0, offset));
        source._position += length1;
        if ((offset += length1) < length) return read(offset);
        resolve(buffer);
      });
    })(0);
  }));
};
