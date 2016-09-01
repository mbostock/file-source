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

tape("source.open(path) yields the source after opening the file", function(test) {
  var hello = file.source();
  hello.open("test/hello.txt")
      .then(function(_) { test.equal(_, hello); return hello.close(); })
      .then(function() { test.end(); });
});

tape("source.open(path) throws an error if the source is already open", function(test) {
  var hello = file.source();
  hello.open("test/hello.txt");
  hello.open("package.json")
      .catch(function(error) { test.equal(error.message, "already open"); test.end(); });
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

tape("source.read(length) yields a buffer of length bytes", function(test) {
  file.open("test/hello.txt")
      .then(function(hello) {
        hello.read(5)
            .then(function(buffer) { test.equal(buffer.toString(), "Hello"); return hello.close(); })
            .then(function() { test.end(); });
      });
});

tape("source.read(length) yields a second buffer of length bytes", function(test) {
  file.open("test/hello.txt")
      .then(function(hello) {
        hello.read(5)
            .then(function(buffer) { test.equal(buffer.toString(), "Hello"); return hello.read(7); })
            .then(function(buffer) { test.equal(buffer.toString(), ", world"); return hello.close(); })
            .then(function() { test.end(); });
      });
});

tape("source.read(length) yields a third buffer of length bytes", function(test) {
  file.open("test/hello.txt")
      .then(function(hello) {
        hello.read(5)
            .then(function(buffer) { test.equal(buffer.toString(), "Hello"); return hello.read(7); })
            .then(function(buffer) { test.equal(buffer.toString(), ", world"); return hello.read(2); })
            .then(function(buffer) { test.equal(buffer.toString(), "!\n"); return hello.close(); })
            .then(function() { test.end(); });
      });
});

tape("source.read(length) yields null if there is no more to be read", function(test) {
  file.open("test/hello.txt")
      .then(function(hello) {
        hello.read(5)
            .then(function(buffer) { test.equal(buffer.toString(), "Hello"); return hello.read(9); })
            .then(function(buffer) { test.equal(buffer.toString(), ", world!\n"); return hello.read(1); })
            .then(function(buffer) { test.equal(buffer, null); return hello.close(); })
            .then(function() { test.end(); });
      });
});

tape("source.read(length) can yield fewer than length bytes at the end of the file", function(test) {
  file.open("test/hello.txt")
      .then(function(hello) {
        hello.read(25)
            .then(function(buffer) { test.equal(buffer.length, 14); return buffer; })
            .then(function(buffer) { test.equal(buffer.toString(), "Hello, world!\n"); return hello.close(); })
            .then(function() { test.end(); });
      });
});

tape("source.read(length) can subsequently yield fewer than length bytes at the end of the file", function(test) {
  file.open("test/hello.txt")
      .then(function(hello) {
        hello.read(5)
            .then(function(buffer) { test.equal(buffer.toString(), "Hello"); return hello.read(20); })
            .then(function(buffer) { test.equal(buffer.toString(), ", world!\n"); return hello.close(); })
            .then(function() { test.end(); });
      });
});

tape("source.read(length) can read in parallel without getting confused", function(test) {
  file.open("test/hello.txt")
      .then(function(hello) {
        Promise.all([
          hello.read(5).then(function(buffer) { test.equal(buffer.toString(), "Hello"); }),
          hello.read(7).then(function(buffer) { test.equal(buffer.toString(), ", world"); })
        ])  .then(function() { return hello.close(); })
            .then(function() { test.end(); });
      });
});

tape("source.close() throws an error if the source is already closed", function(test) {
  var hello = file.source();
  hello.close()
      .catch(function(error) { test.equal(error.message, "already closed"); test.end(); });
});
