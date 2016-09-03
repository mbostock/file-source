var file = require("../../"),
    tape = require("tape");

tape("source.seek(position) sets the new position", function(test) {
  file.open("test/hello.txt")
    .then((source) => source.read(5)
      .then((buffer) => (test.equal(buffer.toString(), "Hello"), source.seek(0).read(12)))
      .then((buffer) => (test.equal(buffer.toString(), "Hello, world"), source.close())))
    .then(() => test.end());
});

tape("source.seek(position) treats a negative position as zero", function(test) {
  file.open("test/hello.txt")
    .then((source) => source.seek(-4).read(5)
      .then((buffer) => (test.equal(buffer.toString(), "Hello"), source.close())))
    .then(() => test.end());
});

tape("source.seek(position) treats an invalid position as zero", function(test) {
  file.open("test/hello.txt")
    .then((source) => source.seek(NaN).read(5)
      .then((buffer) => (test.equal(buffer.toString(), "Hello"), source.close())))
    .then(() => test.end());
});

tape("source.seek(position) floors a fractional position", function(test) {
  file.open("test/hello.txt")
    .then((source) => source.seek(7.8).read(5)
      .then((buffer) => (test.equal(buffer.toString(), "world"), source.close())))
    .then(() => test.end());
});
