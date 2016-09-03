var file = require("../../"),
    tape = require("tape");

tape("source.open(path) yields the source after opening the file", function(test) {
  var source = file.source();
  source.open("test/hello.txt")
    .then((_) => (test.equal(_, source), source.close()))
    .then(() => test.end());
});

tape("source.open(path) throws an error if the source is already open", function(test) {
  file.source()
    .open("test/hello.txt")
    .then((source) => source.open("package.json"))
    .catch((error) => (test.equal(error.message, "not closed"), test.end()));
});

tape("source.open(path) can reopen a source after closing", function(test) {
  var source = file.source();
  source.open("package.json")
    .then(() => source.read(1))
    .then((buffer) => test.equal(buffer.toString(), "{"))
    .then(() => source.close())
    .then(() => source.open("test/hello.txt"))
    .then(() => source.read(5))
    .then((buffer) => (test.equal(buffer.toString(), "Hello"), source.close()))
    .then(() => test.end());
});
