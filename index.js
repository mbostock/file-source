var fs = require("fs"),
    stream = require("stream-source");

exports.source = function(path) {
  return stream.source(fs.createReadStream(path));
};
