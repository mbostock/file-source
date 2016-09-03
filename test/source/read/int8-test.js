var file = require("../../../"),
    tape = require("tape");

tape("source.readInt8() yields a one-byte signed integer", function(test) {
  file.open("test/sequence.dat")
    .then((source) => source.readInt8()
      .then((value) => (test.equal(value, 0x12), source.readInt8()))
      .then((value) => (test.equal(value, 0x34), source.readInt8()))
      .then((value) => (test.equal(value, 0x56), source.readInt8()))
      .then((value) => (test.equal(value, 0x78), source.readInt8()))
      .then((value) => (test.equal(value, -0x70), source.close())))
    .then(() => test.end());
});

tape("source.readInt8() yields null at the end of a file", function(test) {
  file.open("test/sequence.dat")
    .then((source) => source.skip(100).readInt8()
      .then((value) => (test.equal(value, null), source.close())))
    .then(() => test.end());
});
