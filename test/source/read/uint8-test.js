var file = require("../../../"),
    tape = require("tape");

tape("source.readUInt8() yields a one-byte unsigned integer", function(test) {
  file.open("test/sequence.dat")
    .then(function(hello) {
      hello.readUInt8()
        .then(function(value) { test.equal(value, 0x12); return hello.readUInt8(); })
        .then(function(value) { test.equal(value, 0x34); return hello.readUInt8(); })
        .then(function(value) { test.equal(value, 0x56); return hello.readUInt8(); })
        .then(function(value) { test.equal(value, 0x78); return hello.readUInt8(); })
        .then(function(value) { test.equal(value, 0x90); return hello.close(); })
        .then(function() { test.end(); });
    });
});

tape("source.readUInt8() yields null at the end of a file", function(test) {
  file.open("test/sequence.dat")
    .then(function(hello) {
      hello.skip(100).readUInt8()
        .then(function(value) { test.equal(value, null); return hello.close(); })
        .then(function() { test.end(); });
    });
});
