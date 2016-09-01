var file = require("../../"),
    tape = require("tape");

tape("source.open(path) yields the source after opening the file", function(test) {
  var hello = file.source();
  hello.open("test/hello.txt")
    .then(function(_) { test.equal(_, hello); return hello.close(); })
    .then(function() { test.end(); });
});

tape("source.open(path) throws an error if the source is already open", function(test) {
  file.source()
    .open("test/hello.txt")
    .then(function(hello) { return hello.open("package.json"); })
    .catch(function(error) { test.equal(error.message, "not closed"); test.end(); });
});

tape("source.open(path) can reopen a source after closing", function(test) {
  var hello = file.source();
  hello.open("package.json")
    .then(function() { return hello.read(1); })
    .then(function(buffer) { test.equal(buffer.toString(), "{"); })
    .then(function() { return hello.close(); })
    .then(function() { return hello.open("test/hello.txt"); })
    .then(function() { return hello.read(5); })
    .then(function(buffer) { test.equal(buffer.toString(), "Hello"); return hello.close(); })
    .then(function() { test.end(); });
});
