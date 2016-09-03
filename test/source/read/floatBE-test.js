var file = require("../../../"),
    tape = require("tape");

tape("source.readFloatBE() yields an four-byte big-endian float", function(test) {
  file.open("test/sequence.dat")
    .then((source) => source.readFloatBE()
      .then((value) => (test.equal(value, 5.690456613903524e-28), source.readFloatBE()))
      .then((value) => (test.equal(value, -6.776489833620323e-29), source.close())))
    .then(() => test.end());
});

tape("source.readFloatBE() yields null at the end of a file", function(test) {
  file.open("test/sequence.dat")
    .then((source) => source.skip(100).readFloatBE()
      .then((value) => (test.equal(value, null), source.close())))
    .then(() => test.end());
});
