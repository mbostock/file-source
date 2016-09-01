var file = require("../../../"),
    tape = require("tape");

tape("source.readIntBE(length) yields a big-endian signed integer", function(test) {
  file.open("test/sequence.dat")
    .then(function(hello) {
      hello.readIntBE(4)
        .then(function(value) { test.equal(value, 0x12345678); return hello.readIntBE(2); })
        .then(function(value) { test.equal(value, -0x6f55); return hello.close(); })
        .then(function() { test.end(); });
    });
});

tape("source.readIntBE(length) yields null at the end of a file", function(test) {
  file.open("test/sequence.dat")
    .then(function(hello) {
      hello.skip(100).readIntBE(1)
        .then(function(value) { test.equal(value, null); return hello.close(); })
        .then(function() { test.end(); });
    });
});

tape("source.readIntBE(length) floors the specified length", function(test) {
  file.open("test/sequence.dat")
    .then(function(hello) {
      hello.readIntBE(4.9)
        .then(function(value) { test.equal(value, 0x12345678); return hello.close(); })
        .then(function() { test.end(); });
    });
});

tape("source.readIntBE(length) throws an error for an invalid length", function(test) {
  file.open("test/sequence.dat")
    .then(function(hello) {
      test.throws(function() { hello.readIntBE(NaN); }, /invalid length/);
      test.throws(function() { hello.readIntBE(0); }, /invalid length/);
      test.throws(function() { hello.readIntBE(-1); }, /invalid length/);
      test.throws(function() { hello.readIntBE(-0.5); }, /invalid length/);
      test.throws(function() { hello.readIntBE(7); }, /invalid length/);
      hello.close().then(function() { test.end(); });
    });
});
