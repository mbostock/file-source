var file = require("../../../"),
    tape = require("tape");

tape("source.readInt16LE() yields a two-byte little-endian signed integer", function(test) {
  file.open("test/sequence.dat")
    .then((hello) => hello.readInt16LE()
      .then((value) => (test.equal(value, 0x3412), hello.readInt16LE()))
      .then((value) => (test.equal(value, 0x7856), hello.readInt16LE()))
      .then((value) => (test.equal(value, -0x5470), hello.close())))
    .then(() => test.end());
});

tape("source.readInt16LE() yields null at the end of a file", function(test) {
  file.open("test/sequence.dat")
    .then((hello) => hello.skip(100).readInt16LE()
      .then((value) => (test.equal(value, null), hello.close())))
    .then(() => test.end());
});
