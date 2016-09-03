var file = require("../"),
    tape = require("tape");

tape("file.source() returns a file.source", function(test) {
  var source = file.source();
  test.equal(source instanceof file.source, true);
  source.open("test/hello.txt")
    .then(() => source.close())
    .then(() => test.end());
});

tape("file.open(path) yields an open file.source", function(test) {
  file.open("test/hello.txt")
    .then((source) => (test.equal(source instanceof file.source, true), source.close()))
    .then(() => test.end());
});
