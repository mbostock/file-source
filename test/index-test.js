var file = require("../"),
    tape = require("tape");

tape("file.source(path) returns a file.source", function(test) {
  var source = file.source("test/hello.txt");
  test.equal(source instanceof file.source, true);
  test.end();
});

tape("file.open(path, callback) is an alias for file.source(path).open(callback)", function(test) {
  var source = file.open("test/hello.txt");
  test.equal(source instanceof file.source, true);
  test.equal(source.read(5, function(error, buffer) {
    test.equal(error, null);
    test.equal(buffer.toString("ascii"), "Hello");
    test.end();
  }), source);
});

tape("source.open(callback) opens the underlying file", function(test) {
  var source = file.source("test/hello.txt");
  test.equal(source.open(function(error) {
    test.equal(error, null);
    test.end();
  }), source);
});

tape("source.open(callback) throws an error if the file is not closed", function(test) {
  var source = file.source("test/hello.txt").open();
  test.throws(function() { source.open(); }, /already open/);
  var source = file.source("test/hello.txt").open().close().open();
  test.throws(function() { source.open(); }, /already open/);
  test.end();
});

tape("source.open(callback) throws an error if the file was already opened", function(test) {
  var source = file.source("test/hello.txt");
  test.equal(source.open(function() { test.end(); }), source);
  test.throws(function() { source.open(); }, /already open/);
});

tape("source.read(length, callback) throws an error if the file is not yet opened", function(test) {
  var source = file.source("test/hello.txt");
  test.throws(function() { source.read(4); }, /not open/);
  test.end();
});

tape("source.read(length, callback) throws an error if the file was closed", function(test) {
  var source = file.source("test/hello.txt").open().close();
  test.throws(function() { source.read(4); }, /not open/);
  test.end();
});

tape("source.read(length, callback) reads the specified number of bytes", function(test) {
  file.source("test/hello.txt")
      .open(function(error) {
        test.equal(error, null);
      })
      .read(5, function(error, buffer) {
        test.equal(error, null);
        test.equal(buffer.toString("ascii"), "Hello");
      })
      .close(function(error) {
        test.equal(error, null);
        test.end();
      });
});

tape("source.read(length, callback) reads subsequent bytes", function(test) {
  file.source("test/hello.txt")
      .open(function(error) {
        test.equal(error, null);
      })
      .read(5, function(error, buffer) {
        test.equal(error, null);
        test.equal(buffer.toString("ascii"), "Hello");
      })
      .read(10, function(error, buffer) {
        test.equal(error, null);
        test.equal(buffer.toString("ascii"), ", world!\n");
        test.end();
      });
});

tape("source.open(callback) resets the read position", function(test) {
  file.source("test/hello.txt")
      .open()
      .read(5, function(error, buffer) {
        test.equal(error, null);
        test.equal(buffer.toString("ascii"), "Hello");
      })
      .close()
      .open()
      .read(5, function(error, buffer) {
        test.equal(error, null);
        test.equal(buffer.toString("ascii"), "Hello");
        test.end();
      });
});

tape("source.close(callback) throws an error if the file is not open", function(test) {
  var source = file.source("test/hello.txt");
  test.throws(function() { source.close(); }, /already closed/);
  var source = file.source("test/hello.txt").open().close();
  test.throws(function() { source.close(); }, /already closed/);
  test.end();
});
