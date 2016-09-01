var file = require("../../"),
    tape = require("tape");

tape("source.close() yields a closed file.source", function(test) {
  file.open("test/hello.txt").then(function(hello) {
    hello.close().then(function(_) {
      test.equal(_, hello);
      test.end();
    });
  });
});

tape("source.close() throws an error if the source is already closed", function(test) {
  file.source()
    .close()
    .catch(function(error) { test.equal(error.message, "not open"); test.end(); });
});