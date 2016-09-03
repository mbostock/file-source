var file = require("../../../"),
    tape = require("tape");

tape("source.readInt16LE() yields a two-byte little-endian signed integer", function(test) {
  file.open("test/sequence.dat")
    .then((source) => source.readInt16LE()
      .then((value) => (test.equal(value, 0x3412), source.readInt16LE()))
      .then((value) => (test.equal(value, 0x7856), source.readInt16LE()))
      .then((value) => (test.equal(value, -0x5470), source.close())))
    .then(() => test.end());
});

tape("source.readInt16LE() yields null at the end of a file", function(test) {
  file.open("test/sequence.dat")
    .then((source) => source.skip(100).readInt16LE()
      .then((value) => (test.equal(value, null), source.close())))
    .then(() => test.end());
});
