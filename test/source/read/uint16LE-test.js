var file = require("../../../"),
    tape = require("tape");

tape("source.readUInt16LE() yields a two-byte little-endian unsigned integer", function(test) {
  file.open("test/sequence.dat")
    .then((hello) => hello.readUInt16LE()
      .then((value) => (test.equal(value, 0x3412), hello.readUInt16LE()))
      .then((value) => (test.equal(value, 0x7856), hello.readUInt16LE()))
      .then((value) => (test.equal(value, 0xab90), hello.close())))
    .then(() => test.end());
});

tape("source.readUInt16LE() yields null at the end of a file", function(test) {
  file.open("test/sequence.dat")
    .then((hello) => hello.skip(100).readUInt16LE()
      .then((value) => (test.equal(value, null), hello.close())))
    .then(() => test.end());
});
