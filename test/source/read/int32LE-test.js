var file = require("../../../"),
    tape = require("tape");

tape("source.readInt32LE() yields a four-byte little-endian signed integer", function(test) {
  file.open("test/sequence.dat")
    .then(function(hello) {
      hello.readInt32LE()
        .then(function(value) { test.equal(value, 0x78563412); return hello.readInt32LE(); })
        .then(function(value) { test.equal(value, -0x10325470); return hello.close(); })
        .then(function() { test.end(); });
    });
});

tape("source.readInt32LE() yields null at the end of a file", function(test) {
  file.open("test/sequence.dat")
    .then(function(hello) {
      hello.skip(100).readInt32LE()
        .then(function(value) { test.equal(value, null); return hello.close(); })
        .then(function() { test.end(); });
    });
});
