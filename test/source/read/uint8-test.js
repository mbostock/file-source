var file = require("../../../"),
    tape = require("tape");

tape("source.readUInt8() yields a one-byte unsigned integer", function(test) {
  file.open("test/sequence.dat")
    .then((hello) => hello.readUInt8()
      .then((value) => (test.equal(value, 0x12), hello.readUInt8()))
      .then((value) => (test.equal(value, 0x34), hello.readUInt8()))
      .then((value) => (test.equal(value, 0x56), hello.readUInt8()))
      .then((value) => (test.equal(value, 0x78), hello.readUInt8()))
      .then((value) => (test.equal(value, 0x90), hello.close())))
    .then(() => test.end());
});

tape("source.readUInt8() yields null at the end of a file", function(test) {
  file.open("test/sequence.dat")
    .then((hello) => hello.skip(100).readUInt8()
      .then((value) => (test.equal(value, null), hello.close())))
    .then(() => test.end());
});
