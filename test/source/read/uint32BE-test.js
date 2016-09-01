var file = require("../../../"),
    tape = require("tape");

tape("source.readUInt32BE() yields a four-byte big-endian unsigned integer", function(test) {
  file.open("test/sequence.dat")
    .then(function(hello) {
      hello.readUInt32BE()
        .then(function(value) { test.equal(value, 0x12345678); return hello.readUInt32BE(); })
        .then(function(value) { test.equal(value, 0x90abcdef); return hello.close(); })
        .then(function() { test.end(); });
    });
});

tape("source.readUInt32BE() yields null at the end of a file", function(test) {
  file.open("test/sequence.dat")
    .then(function(hello) {
      hello.skip(100).readUInt32BE()
        .then(function(value) { test.equal(value, null); return hello.close(); })
        .then(function() { test.end(); });
    });
});
