var file = require("../../../"),
    tape = require("tape");

tape("source.readFloatBE() yields an four-byte big-endian float", function(test) {
  file.open("test/sequence.dat")
    .then((hello) => hello.readFloatBE()
      .then((value) => (test.equal(value, 5.690456613903524e-28), hello.readFloatBE()))
      .then((value) => (test.equal(value, -6.776489833620323e-29), hello.close())))
    .then(() => test.end());
});

tape("source.readFloatBE() yields null at the end of a file", function(test) {
  file.open("test/sequence.dat")
    .then((hello) => hello.skip(100).readFloatBE()
      .then((value) => (test.equal(value, null), hello.close())))
    .then(() => test.end());
});
