var fs = require("fs");

module.exports = function(length) {
  if (isNaN(length) || (length |= 0) < 0) throw new Error("invalid length");
  return new Promise((resolve, reject) => {
    if (this._fd == null) return reject(new Error("not open"));
    var source = this, buffer = new Buffer(length), position = source._position;
    source._position += length;
    (function read(offset) {
      fs.read(source._fd, buffer, offset, length - offset, position, function(error, length1) {
        if (error) return reject(error);
        if (!length1) return resolve(buffer.slice(0, offset));
        position += length1;
        if ((offset += length1) < length) return read(offset);
        resolve(buffer);
      });
    })(0);
  });
};
