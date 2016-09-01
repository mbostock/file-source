var file = require("../../"),
    tape = require("tape");

tape("source.skip(length) advances the new position by the specified length", function(test) {
  file.open("test/hello.txt")
    .then(function(hello) {
      hello.skip(2).skip(5).read(5)
        .then(function(buffer) { test.equal(buffer.toString(), "world"); return hello.close(); })
        .then(function() { test.end(); });
    });
});

tape("source.skip(length) can take a negative length", function(test) {
  file.open("test/hello.txt")
    .then(function(hello) {
      hello.skip(10).skip(-3).read(5)
        .then(function(buffer) { test.equal(buffer.toString(), "world"); return hello.close(); })
        .then(function() { test.end(); });
    });
});

tape("source.skip(length) treats an invalid position as zero", function(test) {
  file.open("test/hello.txt")
    .then(function(hello) {
      hello.skip(NaN).read(5)
        .then(function(buffer) { test.equal(buffer.toString(), "Hello"); return hello.close(); })
        .then(function() { test.end(); });
    });
});

tape("source.skip(length) floors a fractional position", function(test) {
  file.open("test/hello.txt")
    .then(function(hello) {
      hello.skip(7.8).read(5)
        .then(function(buffer) { test.equal(buffer.toString(), "world"); return hello.close(); })
        .then(function() { test.end(); });
    });
});
