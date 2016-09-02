var file = require("../../../"),
    tape = require("tape");

tape("source.readInt32BE() yields a four-byte big-endian signed integer", function(test) {
  file.open("test/sequence.dat")
    .then((hello) => hello.readInt32BE()
      .then((value) => (test.equal(value, 0x12345678), hello.readInt32BE()))
      .then((value) => (test.equal(value, -0x6f543211), hello.close())))
    .then(() => test.end());
});

tape("source.readInt32BE() yields null at the end of a file", function(test) {
  file.open("test/sequence.dat")
    .then((hello) => hello.skip(100).readInt32BE()
      .then((value) => (test.equal(value, null), hello.close())))
    .then(() => test.end());
});
