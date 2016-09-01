var file = require("../../../"),
    tape = require("tape");

tape("source.readInt16BE() yields a two-byte big-endian signed integer", function(test) {
  file.open("test/sequence.dat")
    .then(function(hello) {
      hello.readInt16BE()
        .then(function(value) { test.equal(value, 0x1234); return hello.readInt16BE(); })
        .then(function(value) { test.equal(value, 0x5678); return hello.readInt16BE(); })
        .then(function(value) { test.equal(value, -0x6f55); return hello.close(); })
        .then(function() { test.end(); });
    });
});

tape("source.readInt16BE() yields null at the end of a file", function(test) {
  file.open("test/sequence.dat")
    .then(function(hello) {
      hello.skip(100).readInt16BE()
        .then(function(value) { test.equal(value, null); return hello.close(); })
        .then(function() { test.end(); });
    });
});
