var source = require("./source");

exports.source = source;
exports.open = open;

function open(path, callback) {
  return source(path).open(callback);
}
