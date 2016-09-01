var file = require("../../../"),
    tape = require("tape");

tape("source.readFloatBE() yields an four-byte big-endian float", function(test) {
  file.open("test/sequence.dat")
    .then(function(hello) {
      hello.readFloatBE()
        .then(function(value) { test.equal(value, 5.690456613903524e-28); return hello.readFloatBE(); })
        .then(function(value) { test.equal(value, -6.776489833620323e-29); return hello.close(); })
        .then(function() { test.end(); });
    });
});

tape("source.readFloatBE() yields null at the end of a file", function(test) {
  file.open("test/sequence.dat")
    .then(function(hello) {
      hello.skip(100).readFloatBE()
        .then(function(value) { test.equal(value, null); return hello.close(); })
        .then(function() { test.end(); });
    });
});
