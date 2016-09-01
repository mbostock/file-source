var file = require("../../../"),
    tape = require("tape");

tape("source.readInt16LE() yields a two-byte little-endian signed integer", function(test) {
  file.open("test/sequence.dat")
    .then(function(hello) {
      hello.readInt16LE()
        .then(function(value) { test.equal(value, 0x3412); return hello.readInt16LE(); })
        .then(function(value) { test.equal(value, 0x7856); return hello.readInt16LE(); })
        .then(function(value) { test.equal(value, -0x5470); return hello.close(); })
        .then(function() { test.end(); });
    });
});

tape("source.readInt16LE() yields null at the end of a file", function(test) {
  file.open("test/sequence.dat")
    .then(function(hello) {
      hello.skip(100).readInt16LE()
        .then(function(value) { test.equal(value, null); return hello.close(); })
        .then(function() { test.end(); });
    });
});
