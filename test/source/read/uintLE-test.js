var file = require("../../../"),
    tape = require("tape");

tape("source.readUIntLE(length) yields a little-endian unsigned integer", function(test) {
  file.open("test/sequence.dat")
    .then(function(hello) {
      hello.readUIntLE(4)
        .then(function(value) { test.equal(value, 0x78563412); return hello.readUIntLE(2); })
        .then(function(value) { test.equal(value, 0xab90); return hello.close(); })
        .then(function() { test.end(); });
    });
});

tape("source.readUIntLE(length) yields null at the end of a file", function(test) {
  file.open("test/sequence.dat")
    .then(function(hello) {
      hello.skip(100).readUIntLE(1)
        .then(function(value) { test.equal(value, null); return hello.close(); })
        .then(function() { test.end(); });
    });
});

tape("source.readUIntLE(length) floors the specified length", function(test) {
  file.open("test/sequence.dat")
    .then(function(hello) {
      hello.readUIntLE(4.9)
        .then(function(value) { test.equal(value, 0x78563412); return hello.close(); })
        .then(function() { test.end(); });
    });
});

tape("source.readUIntLE(length) throws an error for an invalid length", function(test) {
  file.open("test/sequence.dat")
    .then(function(hello) {
      test.throws(function() { hello.readUIntLE(NaN); }, /invalid length/);
      test.throws(function() { hello.readUIntLE(0); }, /invalid length/);
      test.throws(function() { hello.readUIntLE(-1); }, /invalid length/);
      test.throws(function() { hello.readUIntLE(-0.5); }, /invalid length/);
      test.throws(function() { hello.readUIntLE(7); }, /invalid length/);
      hello.close().then(function() { test.end(); });
    });
});
