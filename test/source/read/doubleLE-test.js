var file = require("../../../"),
    tape = require("tape");

tape("source.readDoubleLE() yields an eight-byte little-endian double", function(test) {
  file.open("test/sequence.dat")
    .then(function(hello) {
      hello.readDoubleLE()
        .then(function(value) { test.equal(value, -3.5987094278483163e+230); return hello.close(); })
        .then(function() { test.end(); });
    });
});

tape("source.readDoubleLE() yields null at the end of a file", function(test) {
  file.open("test/sequence.dat")
    .then(function(hello) {
      hello.skip(100).readDoubleLE()
        .then(function(value) { test.equal(value, null); return hello.close(); })
        .then(function() { test.end(); });
    });
});
