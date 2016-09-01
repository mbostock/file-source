# file-source

This is a redesign and generalization of my [binary file reader](https://github.com/mbostock/shapefile/blob/master/file.js) in [shapefile](https://github.com/mbostock/shapefile). See also:

* [binary-file](https://github.com/marvinroger/node-binary-file) by [Marvin Roger](https://github.com/marvinroger)
* [binary-reader](https://github.com/gagle/node-binary-reader) by [Gabriel Llamas](https://github.com/gagle)
* [pull-reader](https://github.com/dominictarr/pull-reader) by [Dominic Tarr](https://github.com/dominictarr)

This is an experiment.

## Usage

```js
var file = require("file-source");

file.open("test/hello.txt").then(function(hello) {
  console.log("opened");
  hello.read(5)
    .then(function(buffer) { console.log(buffer.toString()); return hello.read(2); })
    .then(function(buffer) { return hello.read(5); })
    .then(function(buffer) { console.log(buffer.toString()); return hello.close(); })
    .catch(function(error) { return hello.close(); })
    .then(function() { console.log("closed"); });
});
```

## API Reference

Below, *file* refers to the result of requiring this package. For example:

```js
var file = require("file-source");
```

<a name="source" href="#source">#</a> <i>file</i>.<b>source</b>() [<>](https://github.com/mbostock/file-source/blob/master/index.js#L3 "Source")

Returns a new file source. The source is initially closed; use [*source*.open](#source_open) to open a file.

<a name="open" href="#open">#</a> <i>file</i>.<b>open</b>(<i>path</i>) [<>](https://github.com/mbostock/file-source/blob/master/index.js#L7 "Source")

Returns a promise that yields an open file source for the specified *path*. A convenience method equivalent to:

```js
file.source().open(path);
```

<a name="source_open" href="#source_open">#</a> <i>source</i>.<b>open</b>(<i>path</i>) [<>](https://github.com/mbostock/file-source/blob/master/source/open.js "Source")

Returns a promise that yields an open file source for the specified *path*, positioned at the start of the file.

<a name="source_read" href="#source_read">#</a> <i>source</i>.<b>read</b>(<i>length</i>) [<>](https://github.com/mbostock/file-source/blob/master/source/read.js "Source")

Advances this source’s position by *length* bytes, and returns a promise that yields a buffer containing bytes \[*position*, … *position* + *length* - 1\], inclusive, from the underlying file. If the file is shorter than *position* + *length*, the yielded buffer may contain fewer than *length* bytes.

<a name="source_seek" href="#source_seek">#</a> <i>source</i>.<b>seek</b>(<i>position</i>) [<>](https://github.com/mbostock/file-source/blob/master/source/seek.js "Source")

Sets this source’s position to the specified *position* and returns this source.

<a name="source_skip" href="#source_skip">#</a> <i>source</i>.<b>skip</b>(<i>length</i>) [<>](https://github.com/mbostock/file-source/blob/master/source/skip.js "Source")

Sets this source’s position to the current position plus the specified *length* and returns this source.

<a name="source_close" href="#source_close">#</a> <i>source</i>.<b>close</b>() [<>](https://github.com/mbostock/file-source/blob/master/source/close.js "Source")

Returns a promise that yields a closed file source.
