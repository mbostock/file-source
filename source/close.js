var fs = require("fs"),
    serialize = require("./serialize");

module.exports = function() {
  return serialize(this, () => new Promise((resolve, reject) => {
    if (this._fd == null) return reject(new Error("not open"));
    fs.close(this._fd, (error) => {
      if (error) return reject(error);
      this._fd = null;
      this._position = 0;
      resolve(this);
    });
  }));
};
