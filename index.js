var fs = require("fs"),
    stream = require("stream-source");

module.exports = function(path) {
  return stream(fs.createReadStream(path));
};
