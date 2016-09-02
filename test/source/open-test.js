var file = require("../../"),
    tape = require("tape");

tape("source.open(path) yields the source after opening the file", function(test) {
  var hello = file.source();
  hello.open("test/hello.txt")
    .then((_) => (test.equal(_, hello), hello.close()))
    .then(() => test.end());
});

tape("source.open(path) throws an error if the source is already open", function(test) {
  file.source()
    .open("test/hello.txt")
    .then((hello) => hello.open("package.json"))
    .catch((error) => (test.equal(error.message, "not closed"), test.end()));
});

tape("source.open(path) can reopen a source after closing", function(test) {
  var hello = file.source();
  hello.open("package.json")
    .then(() => hello.read(1))
    .then((buffer) => test.equal(buffer.toString(), "{"))
    .then(() => hello.close())
    .then(() => hello.open("test/hello.txt"))
    .then(() => hello.read(5))
    .then((buffer) => (test.equal(buffer.toString(), "Hello"), hello.close()))
    .then(() => test.end());
});
