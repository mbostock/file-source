var file = require("../../../"),
    tape = require("tape");

tape("source.readUInt32LE() yields a four-byte little-endian unsigned integer", function(test) {
  file.open("test/sequence.dat")
    .then((source) => source.readUInt32LE()
      .then((value) => (test.equal(value, 0x78563412), source.readUInt32LE()))
      .then((value) => (test.equal(value, 0xefcdab90), source.close())))
    .then(() => test.end());
});

tape("source.readUInt32LE() yields null at the end of a file", function(test) {
  file.open("test/sequence.dat")
    .then((source) => source.skip(100).readUInt32LE()
      .then((value) => (test.equal(value, null), source.close())))
    .then(() => test.end());
});
