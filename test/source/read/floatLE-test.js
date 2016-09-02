var file = require("../../../"),
    tape = require("tape");

tape("source.readFloatLE() yields an four-byte little-endian float", function(test) {
  file.open("test/sequence.dat")
    .then((hello) => hello.readFloatLE()
      .then((value) => (test.equal(value, 1.7378244361449504e+34), hello.readFloatLE()))
      .then((value) => (test.equal(value, -1.2730366669860675e+29), hello.close())))
    .then(() => test.end());
});

tape("source.readFloatLE() yields null at the end of a file", function(test) {
  file.open("test/sequence.dat")
    .then((hello) => hello.skip(100).readFloatLE()
      .then((value) => (test.equal(value, null), hello.close())))
    .then(() => test.end());
});
