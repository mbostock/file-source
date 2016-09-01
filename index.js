var Source = require("./source/index");

function source() {
  return new Source;
}

exports.open = function(path) {
  return source().open(path);
};

exports.source = source;

source.prototype = Source.prototype; // instanceof file.source
