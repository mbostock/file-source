var file = require("../../../"),
    tape = require("tape");

tape("source.readUInt32BE() yields a four-byte big-endian unsigned integer", function(test) {
  file.open("test/sequence.dat")
    .then((hello) => hello.readUInt32BE()
      .then((value) => (test.equal(value, 0x12345678), hello.readUInt32BE()))
      .then((value) => (test.equal(value, 0x90abcdef), hello.close())))
    .then(() => test.end());
});

tape("source.readUInt32BE() yields null at the end of a file", function(test) {
  file.open("test/sequence.dat")
    .then((hello) => hello.skip(100).readUInt32BE()
      .then((value) => (test.equal(value, null), hello.close())))
    .then(() => test.end());
});
