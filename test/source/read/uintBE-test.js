var file = require("../../../"),
    tape = require("tape");

tape("source.readUIntBE(length) yields a big-endian unsigned integer", function(test) {
  file.open("test/sequence.dat")
    .then((source) => source.readUIntBE(4)
      .then((value) => (test.equal(value, 0x12345678), source.readUIntBE(2)))
      .then((value) => (test.equal(value, 0x90ab), source.close())))
    .then(() => test.end());
});

tape("source.readUIntBE(length) yields null at the end of a file", function(test) {
  file.open("test/sequence.dat")
    .then((source) => source.skip(100).readUIntBE(1)
      .then((value) => (test.equal(value, null), source.close())))
    .then(() => test.end());
});

tape("source.readUIntBE(length) floors the specified length", function(test) {
  file.open("test/sequence.dat")
    .then((source) => source.readUIntBE(4.9)
      .then((value) => (test.equal(value, 0x12345678), source.close())))
    .then(() => test.end());
});

tape("source.readUIntBE(length) throws an error for an invalid length", function(test) {
  file.open("test/sequence.dat")
    .then((source) => {
      test.throws(() => source.readUIntBE(NaN), /invalid length/);
      test.throws(() => source.readUIntBE(0), /invalid length/);
      test.throws(() => source.readUIntBE(-1), /invalid length/);
      test.throws(() => source.readUIntBE(-0.5), /invalid length/);
      test.throws(() => source.readUIntBE(7), /invalid length/);
      return source.close();
    })
    .then(() => test.end());
});
