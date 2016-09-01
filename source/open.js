var fs = require("fs");

module.exports = function(path) {
  return new Promise((resolve, reject) => {
    if (this._fd != null) return reject(new Error("not closed"));
    this._fd = -1;
    fs.open(path, "r", (error, fd) => {
      if (error) return reject(error);
      this._fd = fd;
      this._position = 0;
      resolve(this);
    });
  });
};
