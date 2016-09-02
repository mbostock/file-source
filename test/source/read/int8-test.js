var file = require("../../../"),
    tape = require("tape");

tape("source.readInt8() yields a one-byte signed integer", function(test) {
  file.open("test/sequence.dat")
    .then((hello) => hello.readInt8()
      .then((value) => (test.equal(value, 0x12), hello.readInt8()))
      .then((value) => (test.equal(value, 0x34), hello.readInt8()))
      .then((value) => (test.equal(value, 0x56), hello.readInt8()))
      .then((value) => (test.equal(value, 0x78), hello.readInt8()))
      .then((value) => (test.equal(value, -0x70), hello.close())))
    .then(() => test.end());
});

tape("source.readInt8() yields null at the end of a file", function(test) {
  file.open("test/sequence.dat")
    .then((hello) => hello.skip(100).readInt8()
      .then((value) => (test.equal(value, null), hello.close())))
    .then(() => test.end());
});
