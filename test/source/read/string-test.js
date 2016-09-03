var file = require("../../../"),
    tape = require("tape");

tape("source.readString(length) yields a string of length bytes in UTF-8 encoding", function(test) {
  file.open("test/utf8.txt")
    .then((source) => source.readString(7)
      .then((string) => (test.equal(string, "Héllø"), source.close())))
    .then(() => test.end());
});

tape("source.readString(length, encoding) yields a string of length bytes in the specified encoding", function(test) {
  file.open("test/utf8.txt")
    .then((source) => source.readString(7, "ascii")
      .then((string) => (test.equal(string, "HC)llC8"), source.close())))
    .then(() => test.end());
});
