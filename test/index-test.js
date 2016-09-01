var file = require("../"),
    tape = require("tape");

tape("file.source() returns a closed file.source", function(test) {
  var hello = file.source();
  test.equal(hello instanceof file.source, true);
  test.equal(hello._fd, null);
  hello.open("test/hello.txt")
    .then(function() { return hello.close(); })
    .then(function() { test.end(); });
});

tape("file.open(path) yields an open file.source", function(test) {
  file.open("test/hello.txt")
    .then(function(hello) { test.equal(hello instanceof file.source, true); return hello.close(); })
    .then(function() { test.end(); });
});
