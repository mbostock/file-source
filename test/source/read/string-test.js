var file = require("../../../"),
    tape = require("tape");

tape("source.readString(length) yields a string of length bytes in UTF-8 encoding", function(test) {
  file.open("test/utf8.txt")
    .then(function(hello) {
      hello.readString(7)
        .then(function(string) { test.equal(string, "Héllø"); return hello.close(); })
        .then(function() { test.end(); });
    });
});

tape("source.readString(length, encoding) yields a string of length bytes in the specified encoding", function(test) {
  file.open("test/utf8.txt")
    .then(function(hello) {
      hello.readString(7, "ascii")
        .then(function(string) { test.equal(string, "HC)llC8"); return hello.close(); })
        .then(function() { test.end(); });
    });
});
