var fs = require("fs");

module.exports = function() {
  if (this._fd == null) throw new Error("not open");
  if (this._active) throw new Error("concurrent operation");
  this._active = true;
  return new Promise((resolve, reject) => {
    fs.close(this._fd, (error) => {
      this._active = false;
      if (error) return reject(error);
      this._fd = null;
      resolve(this);
    });
  });
};
