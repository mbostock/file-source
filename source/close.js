var fs = require("fs");

module.exports = function() {
  return new Promise((resolve, reject) => {
    if (this._fd == null) return reject(new Error("not open"));
    var fd = this._fd;
    this._fd = null;
    fs.close(fd, (error) => {
      if (error) return reject(error);
      this._fd = null;
      resolve(this);
    });
  });
};
