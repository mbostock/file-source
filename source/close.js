var fs = require("fs");

module.exports = function() {
  return new Promise((resolve, reject) => {
    if (this._fd == null) return reject(new Error("not open"));
    fs.close(this._fd, (error) => {
      if (error) return reject(error);
      this._fd = null;
      resolve(this);
    });
  });
};
