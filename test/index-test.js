var file = require("../"),
    tape = require("tape");

tape("file.open() yields a file.source", function(test) {
  file.open("test/hello.txt")
      .then(function(hello) { test.equal(hello instanceof file.source, true); return hello.close(); })
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
