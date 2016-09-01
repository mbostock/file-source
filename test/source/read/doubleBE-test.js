var file = require("../../../"),
    tape = require("tape");

tape("source.readDoubleBE() yields an eight-byte big-endian double", function(test) {
  file.open("test/sequence.dat")
    .then(function(hello) {
      hello.readDoubleBE()
        .then(function(value) { test.equal(value, 5.626349108908516e-221); return hello.close(); })
        .then(function() { test.end(); });
    });
});

tape("source.readDoubleBE() yields null at the end of a file", function(test) {
  file.open("test/sequence.dat")
    .then(function(hello) {
      hello.skip(100).readDoubleBE()
        .then(function(value) { test.equal(value, null); return hello.close(); })
        .then(function() { test.end(); });
    });
});
