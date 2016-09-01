var file = require("../../../"),
    tape = require("tape");

tape("source.readUInt32LE() yields a four-byte little-endian unsigned integer", function(test) {
  file.open("test/sequence.dat")
    .then(function(hello) {
      hello.readUInt32LE()
        .then(function(value) { test.equal(value, 0x78563412); return hello.readUInt32LE(); })
        .then(function(value) { test.equal(value, 0xefcdab90); return hello.close(); })
        .then(function() { test.end(); });
    });
});

tape("source.readUInt32LE() yields null at the end of a file", function(test) {
  file.open("test/sequence.dat")
    .then(function(hello) {
      hello.skip(100).readUInt32LE()
        .then(function(value) { test.equal(value, null); return hello.close(); })
        .then(function() { test.end(); });
    });
});
