var file = require("../../../"),
    tape = require("tape");

tape("source.readInt32LE() yields a four-byte little-endian signed integer", function(test) {
  file.open("test/sequence.dat")
    .then((source) => source.readInt32LE()
      .then((value) => (test.equal(value, 0x78563412), source.readInt32LE()))
      .then((value) => (test.equal(value, -0x10325470), source.close())))
    .then(() => test.end());
});

tape("source.readInt32LE() yields null at the end of a file", function(test) {
  file.open("test/sequence.dat")
    .then((source) => source.skip(100).readInt32LE()
      .then((value) => (test.equal(value, null), source.close())))
    .then(() => test.end());
});
