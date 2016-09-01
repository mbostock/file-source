var file = require("../../../"),
    tape = require("tape");

tape("source.readInt8() yields a one-byte signed integer", function(test) {
  file.open("test/sequence.dat")
    .then(function(hello) {
      hello.readInt8()
        .then(function(value) { test.equal(value, 0x12); return hello.readInt8(); })
        .then(function(value) { test.equal(value, 0x34); return hello.readInt8(); })
        .then(function(value) { test.equal(value, 0x56); return hello.readInt8(); })
        .then(function(value) { test.equal(value, 0x78); return hello.readInt8(); })
        .then(function(value) { test.equal(value, -0x70); return hello.close(); })
        .then(function() { test.end(); });
    });
});

tape("source.readInt8() yields null at the end of a file", function(test) {
  file.open("test/sequence.dat")
    .then(function(hello) {
      hello.skip(100).readInt8()
        .then(function(value) { test.equal(value, null); return hello.close(); })
        .then(function() { test.end(); });
    });
});
