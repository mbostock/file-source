var file = require("../../../"),
    tape = require("tape");

tape("source.readFloatLE() yields an four-byte little-endian float", function(test) {
  file.open("test/sequence.dat")
    .then(function(hello) {
      hello.readFloatLE()
        .then(function(value) { test.equal(value, 1.7378244361449504e+34); return hello.readFloatLE(); })
        .then(function(value) { test.equal(value, -1.2730366669860675e+29); return hello.close(); })
        .then(function() { test.end(); });
    });
});

tape("source.readFloatLE() yields null at the end of a file", function(test) {
  file.open("test/sequence.dat")
    .then(function(hello) {
      hello.skip(100).readFloatLE()
        .then(function(value) { test.equal(value, null); return hello.close(); })
        .then(function() { test.end(); });
    });
});
