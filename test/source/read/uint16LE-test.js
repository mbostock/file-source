var file = require("../../../"),
    tape = require("tape");

tape("source.readUInt16LE() yields a two-byte little-endian unsigned integer", function(test) {
  file.open("test/sequence.dat")
    .then(function(hello) {
      hello.readUInt16LE()
        .then(function(value) { test.equal(value, 0x3412); return hello.readUInt16LE(); })
        .then(function(value) { test.equal(value, 0x7856); return hello.readUInt16LE(); })
        .then(function(value) { test.equal(value, 0xab90); return hello.close(); })
        .then(function() { test.end(); });
    });
});

tape("source.readUInt16LE() yields null at the end of a file", function(test) {
  file.open("test/sequence.dat")
    .then(function(hello) {
      hello.skip(100).readUInt16LE()
        .then(function(value) { test.equal(value, null); return hello.close(); })
        .then(function() { test.end(); });
    });
});
