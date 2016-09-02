var fs = require("fs"),
    serialize = require("./serialize");

module.exports = function(path) {
  return serialize(this, () => new Promise((resolve, reject) => {
    if (this._fd != null) return reject(new Error("not closed"));
    fs.open(path, "r", (error, fd) => {
      if (error) return reject(error);
      this._fd = fd;
      resolve(this);
    });
  }));
};
