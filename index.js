var fs = require("fs"),
    stream = require("stream-source");

module.exports = function(path) {
  return new Promise(function(resolve, reject) {
    var f = fs.createReadStream(path);
    f.once("open", function() { resolve(stream(f)); });
    f.once("error", reject);
  });
};
