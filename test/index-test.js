var file = require("../"),
    tape = require("tape");

tape("file(path) rejects if the specified file does not exist", function(test) {
  file("test/does-not-exist.txt")
    .then(source => {
      test.end("File shouldn’t exist!");
    }, error => {
      test.equal(error.code, "ENOENT");
      test.end();
    });
});

tape("file(path, options) can set the highWaterMark", function(test) {
  file("test/hello.txt", {highWaterMark: 4})
    .then(source => source.read()
      .then(result => {
        test.equal(result.done, false);
        test.equal(result.value.toString(), "Hell");
        return source.cancel();
      }))
    .then(() => test.end())
    .catch(error => test.end(error));
});

tape("source.read() yields {value: buffer, done: false} from the underlying file", function(test) {
  file("test/hello.txt")
    .then(source => source.read()
      .then(result => {
        test.equal(result.done, false);
        test.equal(result.value.toString(), "Hello, world!\n");
        test.end();
      }))
    .catch(error => test.end(error));
});

tape("source.slice(length) yields a buffer from the underlying file", function(test) {
  file("test/hello.txt")
    .then(source => source.slice(7)
      .then(value => {
        test.equal(value.toString(), "Hello, ");
        return source.slice(7);
      })
      .then(value => {
        test.equal(value.toString(), "world!\n");
        return source.slice(7);
      })
      .then(value => {
        test.equal(value, null);
        test.end();
      }))
    .catch(error => test.end(error));
});

tape("source.read() yields {value: undefined, done: true} after reading the underlying file", function(test) {
  file("test/hello.txt")
    .then(source => source.read()
      .then(result => {
        test.equal(result.done, false);
        test.equal(result.value.toString(), "Hello, world!\n");
        return source.read();
      })
      .then(result => {
        test.equal(result.done, true);
        test.equal(result.value, undefined);
        test.end();
      }))
    .catch(error => test.end(error));
});
