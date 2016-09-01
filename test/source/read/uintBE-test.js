var file = require("../../../"),
    tape = require("tape");

tape("source.readUIntBE(length) yields a big-endian unsigned integer", function(test) {
  file.open("test/sequence.dat")
    .then(function(hello) {
      hello.readUIntBE(4)
        .then(function(value) { test.equal(value, 0x12345678); return hello.readUIntBE(2); })
        .then(function(value) { test.equal(value, 0x90ab); return hello.close(); })
        .then(function() { test.end(); });
    });
});

tape("source.readUIntBE(length) yields null at the end of a file", function(test) {
  file.open("test/sequence.dat")
    .then(function(hello) {
      hello.skip(100).readUIntBE(1)
        .then(function(value) { test.equal(value, null); return hello.close(); })
        .then(function() { test.end(); });
    });
});

tape("source.readUIntBE(length) floors the specified length", function(test) {
  file.open("test/sequence.dat")
    .then(function(hello) {
      hello.readUIntBE(4.9)
        .then(function(value) { test.equal(value, 0x12345678); return hello.close(); })
        .then(function() { test.end(); });
    });
});

tape("source.readUIntBE(length) throws an error for an invalid length", function(test) {
  file.open("test/sequence.dat")
    .then(function(hello) {
      test.throws(function() { hello.readUIntBE(NaN); }, /invalid length/);
      test.throws(function() { hello.readUIntBE(0); }, /invalid length/);
      test.throws(function() { hello.readUIntBE(-1); }, /invalid length/);
      test.throws(function() { hello.readUIntBE(-0.5); }, /invalid length/);
      test.throws(function() { hello.readUIntBE(7); }, /invalid length/);
      hello.close().then(function() { test.end(); });
    });
});
