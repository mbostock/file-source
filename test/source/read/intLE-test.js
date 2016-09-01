var file = require("../../../"),
    tape = require("tape");

tape("source.readIntLE(length) yields a little-endian signed integer", function(test) {
  file.open("test/sequence.dat")
    .then(function(hello) {
      hello.readIntLE(4)
        .then(function(value) { test.equal(value, 0x78563412); return hello.readIntLE(2); })
        .then(function(value) { test.equal(value, -0x5470); return hello.close(); })
        .then(function() { test.end(); });
    });
});

tape("source.readIntLE(length) yields null at the end of a file", function(test) {
  file.open("test/sequence.dat")
    .then(function(hello) {
      hello.skip(100).readIntLE(1)
        .then(function(value) { test.equal(value, null); return hello.close(); })
        .then(function() { test.end(); });
    });
});

tape("source.readIntLE(length) floors the specified length", function(test) {
  file.open("test/sequence.dat")
    .then(function(hello) {
      hello.readIntLE(4.9)
        .then(function(value) { test.equal(value, 0x78563412); return hello.close(); })
        .then(function() { test.end(); });
    });
});

tape("source.readIntLE(length) throws an error for an invalid length", function(test) {
  file.open("test/sequence.dat")
    .then(function(hello) {
      test.throws(function() { hello.readIntLE(NaN); }, /invalid length/);
      test.throws(function() { hello.readIntLE(0); }, /invalid length/);
      test.throws(function() { hello.readIntLE(-1); }, /invalid length/);
      test.throws(function() { hello.readIntLE(-0.5); }, /invalid length/);
      test.throws(function() { hello.readIntLE(7); }, /invalid length/);
      hello.close().then(function() { test.end(); });
    });
});
