var file = require("../"),
    tape = require("tape");

tape("file.source() returns a file.source", function(test) {
  var hello = file.source();
  test.equal(hello instanceof file.source, true);
  hello.open("test/hello.txt")
    .then(() => hello.close())
    .then(() => test.end());
});

tape("file.open(path) yields an open file.source", function(test) {
  file.open("test/hello.txt")
    .then((hello) => (test.equal(hello instanceof file.source, true), hello.close()))
    .then(() => test.end());
});
