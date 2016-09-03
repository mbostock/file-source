var file = require("../../../"),
    tape = require("tape");

tape("source.readUIntLE(length) yields a little-endian unsigned integer", function(test) {
  file.open("test/sequence.dat")
    .then((source) => source.readUIntLE(4)
      .then((value) => (test.equal(value, 0x78563412), source.readUIntLE(2)))
      .then((value) => (test.equal(value, 0xab90), source.close())))
    .then(() => test.end());
});

tape("source.readUIntLE(length) yields null at the end of a file", function(test) {
  file.open("test/sequence.dat")
    .then((source) => source.skip(100).readUIntLE(1)
      .then((value) => (test.equal(value, null), source.close())))
    .then(() => test.end());
});

tape("source.readUIntLE(length) floors the specified length", function(test) {
  file.open("test/sequence.dat")
    .then((source) => source.readUIntLE(4.9)
      .then((value) => (test.equal(value, 0x78563412), source.close())))
    .then(() => test.end());
});

tape("source.readUIntLE(length) throws an error for an invalid length", function(test) {
  file.open("test/sequence.dat")
    .then((source) => {
      test.throws(() => source.readUIntLE(NaN), /invalid length/);
      test.throws(() => source.readUIntLE(0), /invalid length/);
      test.throws(() => source.readUIntLE(-1), /invalid length/);
      test.throws(() => source.readUIntLE(-0.5), /invalid length/);
      test.throws(() => source.readUIntLE(7), /invalid length/);
      return source.close();
    })
    .then(() => test.end());
});
