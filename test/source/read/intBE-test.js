var file = require("../../../"),
    tape = require("tape");

tape("source.readIntBE(length) yields a big-endian signed integer", function(test) {
  file.open("test/sequence.dat")
    .then((source) => source.readIntBE(4)
      .then((value) => (test.equal(value, 0x12345678), source.readIntBE(2)))
      .then((value) => (test.equal(value, -0x6f55), source.close())))
    .then(() => test.end());
});

tape("source.readIntBE(length) yields null at the end of a file", function(test) {
  file.open("test/sequence.dat")
    .then((source) => source.skip(100).readIntBE(1)
      .then((value) => (test.equal(value, null), source.close())))
    .then(() => test.end());
});

tape("source.readIntBE(length) floors the specified length", function(test) {
  file.open("test/sequence.dat")
    .then((source) => source.readIntBE(4.9)
      .then((value) => (test.equal(value, 0x12345678), source.close())))
    .then(() => test.end());
});

tape("source.readIntBE(length) throws an error for an invalid length", function(test) {
  file.open("test/sequence.dat")
    .then((source) => {
      test.throws(() => source.readIntBE(NaN), /invalid length/);
      test.throws(() => source.readIntBE(0), /invalid length/);
      test.throws(() => source.readIntBE(-1), /invalid length/);
      test.throws(() => source.readIntBE(-0.5), /invalid length/);
      test.throws(() => source.readIntBE(7), /invalid length/);
      return source.close();
    })
    .then(() => test.end());
});
