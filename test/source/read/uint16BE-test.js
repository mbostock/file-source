var file = require("../../../"),
    tape = require("tape");

tape("source.readUInt16BE() yields a two-byte big-endian unsigned integer", function(test) {
  file.open("test/sequence.dat")
    .then((source) => source.readUInt16BE()
      .then((value) => (test.equal(value, 0x1234), source.readUInt16BE()))
      .then((value) => (test.equal(value, 0x5678), source.readUInt16BE()))
      .then((value) => (test.equal(value, 0x90ab), source.close())))
    .then(() => test.end());
});

tape("source.readUInt16BE() yields null at the end of a file", function(test) {
  file.open("test/sequence.dat")
    .then((source) => source.skip(100).readUInt16BE()
      .then((value) => (test.equal(value, null), source.close())))
    .then(() => test.end());
});
