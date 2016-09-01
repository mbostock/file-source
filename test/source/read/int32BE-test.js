var file = require("../../../"),
    tape = require("tape");

tape("source.readInt32BE() yields a four-byte big-endian signed integer", function(test) {
  file.open("test/sequence.dat")
    .then(function(hello) {
      hello.readInt32BE()
        .then(function(value) { test.equal(value, 0x12345678); return hello.readInt32BE(); })
        .then(function(value) { test.equal(value, -0x6f543211); return hello.close(); })
        .then(function() { test.end(); });
    });
});

tape("source.readInt32BE() yields null at the end of a file", function(test) {
  file.open("test/sequence.dat")
    .then(function(hello) {
      hello.skip(100).readInt32BE()
        .then(function(value) { test.equal(value, null); return hello.close(); })
        .then(function() { test.end(); });
    });
});
