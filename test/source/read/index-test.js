var file = require("../../../"),
    tape = require("tape");

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

tape("source.read(length) yields an empty buffer if there is no more to be read", function(test) {
  file.open("test/hello.txt")
    .then(function(hello) {
      hello.read(5)
        .then(function(buffer) { test.equal(buffer.toString(), "Hello"); return hello.read(9); })
        .then(function(buffer) { test.equal(buffer.toString(), ", world!\n"); return hello.read(1); })
        .then(function(buffer) { test.equal(buffer.length, 0); return hello.close(); })
        .then(function() { test.end(); });
    });
});

tape("source.read(0) yeilds an empty buffer", function(test) {
  file.open("test/hello.txt")
    .then(function(hello) {
      hello.read(0)
        .then(function(buffer) { test.equal(buffer.length, 0); return hello.close(); })
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
        ])
        .then(function() { return hello.close(); })
        .then(function() { test.end(); });
    });
});

tape("source.read(length) throws an error if the length is invalid", function(test) {
  file.open("test/hello.txt")
    .then(function(hello) {
      test.throws(function() { hello.read(NaN); }, /invalid length/);
      test.throws(function() { hello.read(-1); }, /invalid length/);
      test.end();
    });
});

tape("source.read(length) floors a fractional length", function(test) {
  file.open("test/hello.txt")
    .then(function(hello) {
      hello.read(5.8)
        .then(function(buffer) { test.equal(buffer.toString(), "Hello"); return hello.close(); })
        .then(function() { test.end(); });
    });
});

tape("source.read(length) throws an error if the source is not open", function(test) {
  file.source("test/hello.txt")
    .read(5)
    .catch(function(error) { test.equal(error.message, "not open"); test.end(); });
});
