var file = require("../../../"),
    tape = require("tape");

tape("source.readString(length) yields a string of length bytes in UTF-8 encoding", function(test) {
  file.open("test/utf8.txt")
    .then((hello) => hello.readString(7)
      .then((string) => (test.equal(string, "Héllø"), hello.close())))
    .then(() => test.end());
});

tape("source.readString(length, encoding) yields a string of length bytes in the specified encoding", function(test) {
  file.open("test/utf8.txt")
    .then((hello) => hello.readString(7, "ascii")
      .then((string) => (test.equal(string, "HC)llC8"), hello.close())))
    .then(() => test.end());
});
