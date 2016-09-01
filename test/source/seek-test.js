var file = require("../../"),
    tape = require("tape");

tape("source.seek(position) sets the new position", function(test) {
  file.open("test/hello.txt")
    .then(function(hello) {
      hello.read(5)
        .then(function(buffer) { test.equal(buffer.toString(), "Hello"); return hello.seek(0).read(12); })
        .then(function(buffer) { test.equal(buffer.toString(), "Hello, world"); return hello.close(); })
        .then(function() { test.end(); });
    });
});

tape("source.seek(position) treats a negative position as zero", function(test) {
  file.open("test/hello.txt")
    .then(function(hello) {
      hello.seek(-4).read(5)
        .then(function(buffer) { test.equal(buffer.toString(), "Hello"); return hello.close(); })
        .then(function() { test.end(); });
    });
});

tape("source.seek(position) treats an invalid position as zero", function(test) {
  file.open("test/hello.txt")
    .then(function(hello) {
      hello.seek(NaN).read(5)
        .then(function(buffer) { test.equal(buffer.toString(), "Hello"); return hello.close(); })
        .then(function() { test.end(); });
    });
});

tape("source.seek(position) floors a fractional position", function(test) {
  file.open("test/hello.txt")
    .then(function(hello) {
      hello.seek(7.8).read(5)
        .then(function(buffer) { test.equal(buffer.toString(), "world"); return hello.close(); })
        .then(function() { test.end(); });
    });
});
