# file-source

A [readable stream reader](https://streams.spec.whatwg.org/#readable-stream-reader) implementation on top of a Node [file read stream](https://nodejs.org/api/fs.html#fs_fs_createreadstream_path_options). This library allows you to write code that takes a *reader* as input, and can work with either native readable streams or Node streams. For example:

```js
var file = require("file-source");

function read(source) {
  return source.read().then((result) => {
    if (result.done) return;
    process.stdout.write(result.value);
    return read(source);
  });
}

read(file.source("README.md"))
  .catch((error) => console.error(error.stack));
```

The returned *source* is a [sliceable source](https://github.com/mbostock/slice-source), which is to say that [*source*.read](#source_read) accepts an optional *length* input allowing you to read the specified number of bytes from the underlying file.

See also:

* The [Readable Streams specification](https://streams.spec.whatwg.org/#rs)
* The promise-y [binary-file](https://github.com/marvinroger/node-binary-file) by Marvin Roger
* The fluent [binary-reader](https://github.com/gagle/node-binary-reader) by Gabriel Llamas
* The [history of streams](http://dominictarr.com/post/145135293917/history-of-streams), [pull streams](http://dominictarr.com/post/149248845122/pull-streams-pull-streams-are-a-very-simple) and [pull-reader](https://github.com/dominictarr/pull-reader) by Dominic Tarr
* A discussion on [binary pull streams](https://github.com/pull-stream/pull-stream/issues/15)
* A discussion on [fs.read](https://groups.google.com/d/msg/nodejs/3Gv_4EqSAOc/yJxGmjq-9YMJ)

## API Reference

<a name="source" href="#source">#</a> file.<b>source</b>(<i>path</i>) [<>](https://github.com/mbostock/file-source/blob/master/index.js "Source")

Returns a *source* for the file at the specified *path*.

<a name="source_read" href="#source_read">#</a> <i>source</i>.<b>read</b>([<i>length</i>]) [<>](https://github.com/mbostock/stream-source/blob/master/read.js "Source")

Returns a Promise for the next chunk of data from the underlying stream. The yielded result is an object with the following properties:

* `value` - a [Uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) (a [Buffer](https://nodejs.org/api/buffer.html)), or undefined if the stream ended
* `done` - a boolean which is true if the stream ended

If an optional *length* is specified, the promise will be yielded with a *value* of *length* bytes, or the remaining bytes of the underlying stream if the underlying stream has more than zero but fewer than *length* bytes remaining. When no bytes remain in the stream, the yielded *value* will be undefined, and *done* will be true.

<a name="source_cancel" href="#source_cancel">#</a> <i>source</i>.<b>cancel</b>() [<>](https://github.com/mbostock/stream-source/blob/master/cancel.js "Source")

Returns a Promise which is resolved when the underlying stream has been destroyed.
