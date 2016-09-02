var file = require("../../../"),
    tape = require("tape");

tape("source.readDoubleLE() yields an eight-byte little-endian double", function(test) {
  file.open("test/sequence.dat")
    .then((hello) => hello.readDoubleLE()
      .then((value) => (test.equal(value, -3.5987094278483163e+230), hello.close())))
    .then(() => test.end());
});

tape("source.readDoubleLE() yields null at the end of a file", function(test) {
  file.open("test/sequence.dat")
    .then((hello) => hello.skip(100).readDoubleLE()
      .then((value) => (test.equal(value, null), hello.close())))
    .then(() => test.end());
});
