var file = require("../../../"),
    tape = require("tape");

tape("source.readUInt8() yields a one-byte unsigned integer", function(test) {
  file.open("test/sequence.dat")
    .then((source) => source.readUInt8()
      .then((value) => (test.equal(value, 0x12), source.readUInt8()))
      .then((value) => (test.equal(value, 0x34), source.readUInt8()))
      .then((value) => (test.equal(value, 0x56), source.readUInt8()))
      .then((value) => (test.equal(value, 0x78), source.readUInt8()))
      .then((value) => (test.equal(value, 0x90), source.close())))
    .then(() => test.end());
});

tape("source.readUInt8() yields null at the end of a file", function(test) {
  file.open("test/sequence.dat")
    .then((source) => source.skip(100).readUInt8()
      .then((value) => (test.equal(value, null), source.close())))
    .then(() => test.end());
});
