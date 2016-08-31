var fs = require("fs"),
    step = require("./step");

module.exports = function(source, callback) {
  source._active = true;
  fs.close(source._fd, function(error) {
    source._active = false;
    step(source);
    callback(source._error = error);
  });
  return source;
};
