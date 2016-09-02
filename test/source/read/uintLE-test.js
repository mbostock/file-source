var file = require("../../../"),
    tape = require("tape");

tape("source.readUIntLE(length) yields a little-endian unsigned integer", function(test) {
  file.open("test/sequence.dat")
    .then((hello) => hello.readUIntLE(4)
      .then((value) => (test.equal(value, 0x78563412), hello.readUIntLE(2)))
      .then((value) => (test.equal(value, 0xab90), hello.close())))
    .then(() => test.end());
});

tape("source.readUIntLE(length) yields null at the end of a file", function(test) {
  file.open("test/sequence.dat")
    .then((hello) => hello.skip(100).readUIntLE(1)
      .then((value) => (test.equal(value, null), hello.close())))
    .then(() => test.end());
});

tape("source.readUIntLE(length) floors the specified length", function(test) {
  file.open("test/sequence.dat")
    .then((hello) => hello.readUIntLE(4.9)
      .then((value) => (test.equal(value, 0x78563412), hello.close())))
    .then(() => test.end());
});

tape("source.readUIntLE(length) throws an error for an invalid length", function(test) {
  file.open("test/sequence.dat")
    .then((hello) => {
      test.throws(() => hello.readUIntLE(NaN), /invalid length/);
      test.throws(() => hello.readUIntLE(0), /invalid length/);
      test.throws(() => hello.readUIntLE(-1), /invalid length/);
      test.throws(() => hello.readUIntLE(-0.5), /invalid length/);
      test.throws(() => hello.readUIntLE(7), /invalid length/);
      return hello.close();
    })
    .then(() => test.end());
});
