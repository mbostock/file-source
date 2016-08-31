var fs = require("fs"),
    step = require("./step");

module.exports = function(source, callback) {
  source._active = true;
  fs.open(source._path, "r", function(error, fd) {
    source._active = false;
    source._fd = fd;
    source._position = 0;
    step(source);
    callback(source._error = error);
  });
  return source;
};
