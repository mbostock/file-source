var file = require("../../../"),
    tape = require("tape");

tape("source.readUInt16BE() yields a two-byte big-endian unsigned integer", function(test) {
  file.open("test/sequence.dat")
    .then((hello) => hello.readUInt16BE()
      .then((value) => (test.equal(value, 0x1234), hello.readUInt16BE()))
      .then((value) => (test.equal(value, 0x5678), hello.readUInt16BE()))
      .then((value) => (test.equal(value, 0x90ab), hello.close())))
    .then(() => test.end());
});

tape("source.readUInt16BE() yields null at the end of a file", function(test) {
  file.open("test/sequence.dat")
    .then((hello) => hello.skip(100).readUInt16BE()
      .then((value) => (test.equal(value, null), hello.close())))
    .then(() => test.end());
});
