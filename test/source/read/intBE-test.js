var file = require("../../../"),
    tape = require("tape");

tape("source.readIntBE(length) yields a big-endian signed integer", function(test) {
  file.open("test/sequence.dat")
    .then((hello) => hello.readIntBE(4)
      .then((value) => (test.equal(value, 0x12345678), hello.readIntBE(2)))
      .then((value) => (test.equal(value, -0x6f55), hello.close())))
    .then(() => test.end());
});

tape("source.readIntBE(length) yields null at the end of a file", function(test) {
  file.open("test/sequence.dat")
    .then((hello) => hello.skip(100).readIntBE(1)
      .then((value) => (test.equal(value, null), hello.close())))
    .then(() => test.end());
});

tape("source.readIntBE(length) floors the specified length", function(test) {
  file.open("test/sequence.dat")
    .then((hello) => hello.readIntBE(4.9)
      .then((value) => (test.equal(value, 0x12345678), hello.close())))
    .then(() => test.end());
});

tape("source.readIntBE(length) throws an error for an invalid length", function(test) {
  file.open("test/sequence.dat")
    .then((hello) => {
      test.throws(() => hello.readIntBE(NaN), /invalid length/);
      test.throws(() => hello.readIntBE(0), /invalid length/);
      test.throws(() => hello.readIntBE(-1), /invalid length/);
      test.throws(() => hello.readIntBE(-0.5), /invalid length/);
      test.throws(() => hello.readIntBE(7), /invalid length/);
      return hello.close();
    })
    .then(() => test.end());
});
