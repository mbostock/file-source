var file = require("../../../"),
    tape = require("tape");

tape("source.readUIntBE(length) yields a big-endian unsigned integer", function(test) {
  file.open("test/sequence.dat")
    .then((hello) => hello.readUIntBE(4)
      .then((value) => (test.equal(value, 0x12345678), hello.readUIntBE(2)))
      .then((value) => (test.equal(value, 0x90ab), hello.close())))
    .then(() => test.end());
});

tape("source.readUIntBE(length) yields null at the end of a file", function(test) {
  file.open("test/sequence.dat")
    .then((hello) => hello.skip(100).readUIntBE(1)
      .then((value) => (test.equal(value, null), hello.close())))
    .then(() => test.end());
});

tape("source.readUIntBE(length) floors the specified length", function(test) {
  file.open("test/sequence.dat")
    .then((hello) => hello.readUIntBE(4.9)
      .then((value) => (test.equal(value, 0x12345678), hello.close())))
    .then(() => test.end());
});

tape("source.readUIntBE(length) throws an error for an invalid length", function(test) {
  file.open("test/sequence.dat")
    .then((hello) => {
      test.throws(() => hello.readUIntBE(NaN), /invalid length/);
      test.throws(() => hello.readUIntBE(0), /invalid length/);
      test.throws(() => hello.readUIntBE(-1), /invalid length/);
      test.throws(() => hello.readUIntBE(-0.5), /invalid length/);
      test.throws(() => hello.readUIntBE(7), /invalid length/);
      return hello.close();
    })
    .then(() => test.end());
});
