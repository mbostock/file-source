var file = require("../../../"),
    tape = require("tape");

tape("source.readInt16BE() yields a two-byte big-endian signed integer", function(test) {
  file.open("test/sequence.dat")
    .then((hello) => hello.readInt16BE()
      .then((value) => (test.equal(value, 0x1234), hello.readInt16BE()))
      .then((value) => (test.equal(value, 0x5678), hello.readInt16BE()))
      .then((value) => (test.equal(value, -0x6f55), hello.close())))
    .then(() => test.end());
});

tape("source.readInt16BE() yields null at the end of a file", function(test) {
  file.open("test/sequence.dat")
    .then((hello) => hello.skip(100).readInt16BE()
      .then((value) => (test.equal(value, null), hello.close())))
    .then(() => test.end());
});
