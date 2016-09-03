var file = require("../../../"),
    tape = require("tape");

tape("source.readFloatLE() yields an four-byte little-endian float", function(test) {
  file.open("test/sequence.dat")
    .then((source) => source.readFloatLE()
      .then((value) => (test.equal(value, 1.7378244361449504e+34), source.readFloatLE()))
      .then((value) => (test.equal(value, -1.2730366669860675e+29), source.close())))
    .then(() => test.end());
});

tape("source.readFloatLE() yields null at the end of a file", function(test) {
  file.open("test/sequence.dat")
    .then((source) => source.skip(100).readFloatLE()
      .then((value) => (test.equal(value, null), source.close())))
    .then(() => test.end());
});
