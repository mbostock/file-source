# file-source

Read binary files in chunks, on demand, with promises. To load:

```js
var file = require("file-source");
```

Here’s how you might read a file in two parts, and then close it safely:

```js
var source = file.source();

source.open("example.txt")
  .then(() => source.read(5))
  .then((buffer) => (console.log(buffer), source.skip(2).read(5)))
  .then((buffer) => console.log(buffer))
  .catch((error) => source.close().then(() => { throw error; }))
  .then(() => source.close())
  .catch((error) => console.error(error.stack));
```

The resulting output:

```
<Buffer 48 65 6c 6c 6f>
<Buffer 77 6f 72 6c 64>
```

To avoid the local variable, put [read](#source_read) and [close](#source_close) operations inside the [*source*.open](#source_open) resolution:

```js
file.open("example.txt")
  .then((source) => source.read(5)
    .then((buffer) => (console.log(buffer), source.skip(2).read(5)))
    .then((buffer) => console.log(buffer))
    .catch((error) => source.close().then(() => { throw error; }))
    .then(() => source.close()))
  .catch((error) => console.error(error.stack));
```

If available, use [*promise*.finally](https://github.com/tc39/proposal-promise-finally) to close, rather than handling resolution and rejection separately.

See also:

* The promise-y [binary-file](https://github.com/marvinroger/node-binary-file) by Marvin Roger
* The fluent [binary-reader](https://github.com/gagle/node-binary-reader) by Gabriel Llamas
* The [history of streams](http://dominictarr.com/post/145135293917/history-of-streams), [pull streams](http://dominictarr.com/post/149248845122/pull-streams-pull-streams-are-a-very-simple) and [pull-reader](https://github.com/dominictarr/pull-reader) by Dominic Tarr
* A discussion on [binary pull streams](https://github.com/pull-stream/pull-stream/issues/15)
* A discussion on [fs.read](https://groups.google.com/d/msg/nodejs/3Gv_4EqSAOc/yJxGmjq-9YMJ)

## API Reference

<a name="source" href="#source">#</a> file.<b>source</b>([<i>options</i>]) [<>](https://github.com/mbostock/file-source/blob/master/index.js#L4 "Source")

Returns a new file source. The source is initially closed; use [file.open](#open) or [*source*.open](#source_open) to open a file. The supported options are:

* `size` - the internal buffer size, akin to Node’s highWaterMark

<a name="open" href="#open">#</a> file.<b>open</b>(<i>path</i>[, <i>options</i>]) [<>](https://github.com/mbostock/file-source/blob/master/index.js#L10 "Source")

Returns a promise that yields an open file source for the specified *path* and optional *options*. A convenience method equivalent to:

```js
file.source(options).open(path)
```

For example:

```js
file.open("example.txt")
  .then((source) => source.close())
  .catch((error) => console.error(error.stack));
```

<a name="source_open" href="#source_open">#</a> <i>source</i>.<b>open</b>(<i>path</i>) [<>](https://github.com/mbostock/file-source/blob/master/source/open.js "Source")

Returns a promise that yields an open file source for the specified *path*, positioned at the start of the file. Yields an error if this source is not closed or if there was an error opening the underlying file. In this case, this source is still considered closed, and you can use this source to open another file if desired.

After opening, you can call [*source*.close](#source_close) to close the file. After closing, you can re-open a source with the same or different path, if desired. If this source was created using [file.open](#open), the yielded source is already open, and you don’t need to call this method.

<a name="source_read" href="#source_read">#</a> <i>source</i>.<b>read</b>(<i>length</i>) [<>](https://github.com/mbostock/file-source/blob/master/source/read/index.js "Source")

Advances this source’s position by *length* bytes and returns a promise that yields a buffer containing bytes \[*position*, … *position* + *length* - 1\], inclusive, from the underlying file. For example:

```js
file.open("example.txt")
  .then((source) => source.read(5)
    .then((buffer) => console.log(buffer))
    .catch((error) => source.close().then(() => { throw error; }))
    .then(() => source.close()))
  .catch((error) => console.error(error.stack));
```

If the file is shorter than *position* + *length*, the yielded buffer may contain fewer than *length* (and possibly zero) bytes. For example, to read a file in 20-byte chunks:

```js
file.open("example.txt")
  .then((source) => Promise.resolve()
    .then(function repeat() { return source.read(20)
      .then((buffer) => buffer.length && (console.log(buffer), repeat())); })
    .catch((error) => source.close().then(() => { throw error; }))
    .then(() => source.close()))
  .catch((error) => console.error(error.stack));
```

<a name="source_seek" href="#source_seek">#</a> <i>source</i>.<b>seek</b>(<i>position</i>) [<>](https://github.com/mbostock/file-source/blob/master/source/seek.js "Source")

Sets this source’s position to the specified *position* and returns this source.

<a name="source_skip" href="#source_skip">#</a> <i>source</i>.<b>skip</b>(<i>length</i>) [<>](https://github.com/mbostock/file-source/blob/master/source/skip.js "Source")

Sets this source’s position to the current position plus the specified *length* and returns this source.

<a name="source_close" href="#source_close">#</a> <i>source</i>.<b>close</b>() [<>](https://github.com/mbostock/file-source/blob/master/source/close.js "Source")

Returns a promise that yields a closed file source.
