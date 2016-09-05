var file = require("../"),
    tape = require("tape");

tape("source.read() yields {value: buffer, done: false} from the underlying file", function(test) {
  var source = file.source("test/hello.txt");
  source.read().then((result) => {
    test.equal(result.done, false);
    test.equal(result.value.toString(), "Hello, world!\n");
    test.end();
  });
});

tape("source.read(length) yields {value: buffer, done: false} from the underlying file", function(test) {
  var source = file.source("test/hello.txt");
  source.read(7).then((result) => {
    test.equal(result.done, false);
    test.equal(result.value.toString(), "Hello, ");
    return source.read(7);
  }).then((result) => {
    test.equal(result.done, false);
    test.equal(result.value.toString(), "world!\n");
    return source.read();
  }).then((result) => {
    test.equal(result.done, true);
    test.equal(result.value, undefined);
    test.end();
  });
});

tape("source.read() yields {value: undefined, done: true} after reading the underlying file", function(test) {
  var source = file.source("test/hello.txt");
  source.read().then(() => source.read()).then((result) => {
    test.equal(result.done, true);
    test.equal(result.value, undefined);
    test.end();
  });
});
