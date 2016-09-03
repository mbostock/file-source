var file = require("../../../"),
    tape = require("tape");

tape("source.readDoubleBE() yields an eight-byte big-endian double", function(test) {
  file.open("test/sequence.dat")
    .then((source) => source.readDoubleBE()
      .then((value) => (test.equal(value, 5.626349108908516e-221), source.close())))
    .then(() => test.end());
});

tape("source.readDoubleBE() yields null at the end of a file", function(test) {
  file.open("test/sequence.dat")
    .then((source) => source.skip(100).readDoubleBE()
      .then((value) => (test.equal(value, null), source.close())))
    .then(() => test.end());
});
