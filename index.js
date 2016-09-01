var BufferedSource = require("./source/buffer/index"),
    Source = require("./source/index");

function source(options) {
  var source = new Source, size = 65536;
  if (options && options.size != null) size = +options.size;
  return size ? new BufferedSource(source, size) : source;
}

exports.open = function(path, options) {
  return source(options).open(path);
};

exports.source = source;

source.prototype = Source.prototype; // instanceof file.source
