var fs = require("fs");

module.exports = function(path) {
  if (this._fd != null) throw new Error("not closed");
  if (this._active) throw new Error("concurrent operation");
  this._active = true;
  return new Promise((resolve, reject) => {
    fs.open(path, "r", (error, fd) => {
      this._active = false;
      if (error) return reject(error);
      this._fd = fd;
      this._position = 0;
      resolve(this);
    });
  });
};
