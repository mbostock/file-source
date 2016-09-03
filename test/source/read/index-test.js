var file = require("../../../"),
    tape = require("tape");

for (let i of [0, 2, null]) {
  let options = {size: i};

  tape("source.read(length) yields a buffer of length bytes", function(test) {
    file.open("test/hello.txt", options)
      .then((source) => source.read(5)
        .then((buffer) => (test.equal(buffer.toString(), "Hello"), source.close())))
      .then(() => test.end());
  });

  tape("source.read(length) yields a second buffer of length bytes", function(test) {
    file.open("test/hello.txt", options)
      .then((source) => source.read(5)
        .then((buffer) => (test.equal(buffer.toString(), "Hello"), source.read(7)))
        .then((buffer) => (test.equal(buffer.toString(), ", world"), source.close())))
      .then(() => test.end());
  });

  tape("source.read(length) yields a third buffer of length bytes", function(test) {
    file.open("test/hello.txt", options)
      .then((source) => source.read(5)
        .then((buffer) => (test.equal(buffer.toString(), "Hello"), source.read(7)))
        .then((buffer) => (test.equal(buffer.toString(), ", world"), source.read(2)))
        .then((buffer) => (test.equal(buffer.toString(), "!\n"), source.close())))
      .then(() => test.end());
  });

  tape("source.read(length) yields an empty buffer if there is no more to be read", function(test) {
    file.open("test/hello.txt", options)
      .then((source) => source.read(5)
        .then((buffer) => (test.equal(buffer.toString(), "Hello"), source.read(9)))
        .then((buffer) => (test.equal(buffer.toString(), ", world!\n"), source.read(10)))
        .then((buffer) => (test.equal(buffer.length, 0), source.close())))
      .then(() => test.end());
  });

  tape("source.read(0) yeilds an empty buffer", function(test) {
    file.open("test/hello.txt", options)
      .then((source) => source.read(0)
        .then((buffer) => (test.equal(buffer.length, 0), source.close())))
      .then(() => test.end());
  });

  tape("source.read(length) can yield fewer than length bytes at the end of the file", function(test) {
    file.open("test/hello.txt", options)
      .then((source) => source.read(25)
        .then((buffer) => (test.equal(buffer.length, 14), buffer))
        .then((buffer) => (test.equal(buffer.toString(), "Hello, world!\n"), source.close())))
      .then(() => test.end());
  });

  tape("source.read(length) can subsequently yield fewer than length bytes at the end of the file", function(test) {
    file.open("test/hello.txt", options)
      .then((source) => source.read(5)
        .then((buffer) => (test.equal(buffer.toString(), "Hello"), source.read(20)))
        .then((buffer) => (test.equal(buffer.toString(), ", world!\n"), source.close())))
      .then(() => test.end());
  });

  tape("source.read(length) serializes parallel reads", function(test) {
    file.open("test/hello.txt", options)
      .then((source) => Promise.all([
          source.readString(5).then((s) => test.equal(s, "Hello")),
          source.skip(2).readString(5).then((s) => test.equal(s, "world"))
        ])
        .then(() => source.close()))
      .then(() => test.end());
  });

  tape("source.read(length) throws an error if the length is invalid", function(test) {
    file.open("test/hello.txt", options)
      .then((source) => {
        test.throws(() => source.read(NaN), /invalid length/);
        test.throws(() => source.read(-1), /invalid length/);
        return source.close();
      })
      .then(() => test.end());
  });

  tape("source.read(length) floors a fractional length", function(test) {
    file.open("test/hello.txt", options)
      .then((source) => source.read(5.8)
        .then((buffer) => test.equal(buffer.toString(), "Hello"), source.close()))
      .then(() => test.end());
  });

  tape("source.read(length) throws an error if the source is not open", function(test) {
    file.source("test/hello.txt").read(5).catch((error) => {
      test.equal(error.message, "not open");
      test.end();
    });
  });
}
