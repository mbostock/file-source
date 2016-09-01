var file = require("../../../"),
    tape = require("tape");

tape("source.readUInt16BE() yields a two-byte big-endian unsigned integer", function(test) {
  file.open("test/sequence.dat")
    .then(function(hello) {
      hello.readUInt16BE()
        .then(function(value) { test.equal(value, 0x1234); return hello.readUInt16BE(); })
        .then(function(value) { test.equal(value, 0x5678); return hello.readUInt16BE(); })
        .then(function(value) { test.equal(value, 0x90ab); return hello.close(); })
        .then(function() { test.end(); });
    });
});

tape("source.readUInt16BE() yields null at the end of a file", function(test) {
  file.open("test/sequence.dat")
    .then(function(hello) {
      hello.skip(100).readUInt16BE()
        .then(function(value) { test.equal(value, null); return hello.close(); })
        .then(function() { test.end(); });
    });
});
