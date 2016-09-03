var file = require("../../../"),
    tape = require("tape");

tape("source.readIntLE(length) yields a little-endian signed integer", function(test) {
  file.open("test/sequence.dat")
    .then((source) => source.readIntLE(4)
      .then((value) => (test.equal(value, 0x78563412), source.readIntLE(2)))
      .then((value) => (test.equal(value, -0x5470), source.close())))
    .then(() => test.end());
});

tape("source.readIntLE(length) yields null at the end of a file", function(test) {
  file.open("test/sequence.dat")
    .then((source) => source.skip(100).readIntLE(1)
      .then((value) => (test.equal(value, null), source.close())))
    .then(() => test.end());
});

tape("source.readIntLE(length) floors the specified length", function(test) {
  file.open("test/sequence.dat")
    .then((source) => source.readIntLE(4.9)
      .then((value) => (test.equal(value, 0x78563412), source.close())))
    .then(() => test.end());
});

tape("source.readIntLE(length) throws an error for an invalid length", function(test) {
  file.open("test/sequence.dat")
    .then((source) => {
      test.throws(() => source.readIntLE(NaN), /invalid length/);
      test.throws(() => source.readIntLE(0), /invalid length/);
      test.throws(() => source.readIntLE(-1), /invalid length/);
      test.throws(() => source.readIntLE(-0.5), /invalid length/);
      test.throws(() => source.readIntLE(7), /invalid length/);
      return source.close();
    })
    .then(() => test.end());
});
