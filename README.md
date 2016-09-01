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

Returns a new file source. The source is initially closed; use [*file*.open](#open) or [*source*.open](#source_open) to open a file. For example:

```js
var hello = file.source();
```

<a name="open" href="#open">#</a> <i>file</i>.<b>open</b>(<i>path</i>) [<>](https://github.com/mbostock/file-source/blob/master/index.js#L7 "Source")

Returns a promise that yields an open file source for the specified *path*. A convenience method equivalent to:

```js
file.source().open(path);
```

For example:

```js
file.open("hello.txt")
  .then(function(hello) { console.log("opened", hello); })
  .catch(function(error) { console.error(error.stack); });
```

<a name="source_open" href="#source_open">#</a> <i>source</i>.<b>open</b>(<i>path</i>) [<>](https://github.com/mbostock/file-source/blob/master/source/open.js "Source")

Returns a promise that yields an open file source for the specified *path*, positioned at the start of the file. For example:

```js
var hello = file.source();
hello.open("hello.txt")
  .then(function() { console.log("opened", hello); })
  .catch(function(error) { console.error(error.stack); });
```

Yields an error if this source is not closed or if there was an error opening the underlying file. In this case, this source is still considered closed, and you can use this source to open another file if desired.

After opening, you can call [*source*.close](#source_close) to close the file. After closing, you can re-open a source with the same or different path, if desired. If this source was created using [*file*.open](#open), the yielded source is already open, and you don’t need to call this method.

<a name="source_read" href="#source_read">#</a> <i>source</i>.<b>read</b>(<i>length</i>) [<>](https://github.com/mbostock/file-source/blob/master/source/read.js "Source")

Advances this source’s position by *length* bytes, and returns a promise that yields a buffer containing bytes \[*position*, … *position* + *length* - 1\], inclusive, from the underlying file. If the file is shorter than *position* + *length*, the yielded buffer may contain fewer than *length* bytes. For example:

```js
var file = require("./");

file.open("hello.txt")
  .then(function(hello) {
    return hello.read(5)
      .then(function(buffer) { console.log(buffer); })
      .catch(function(error) { console.error("read", error.stack); })
      .then(function() { console.log("closed"); });
  })
  .catch(function(error) { console.error("open", error.stack); });
```

<a name="source_readDoubleBE" href="#source_readDoubleBE">#</a> <i>source</i>.<b>readDoubleBE</b>() [<>](https://github.com/mbostock/file-source/blob/master/source/read/doubleBE.js "Source")

Advances this source’s position by eight bytes, and returns a promise that yields a big-endian double from the underlying file. See [*buffer*.readDoubleBE](https://nodejs.org/api/buffer.html#buffer_buf_readdoublebe_offset_noassert).

<a name="source_readDoubleLE" href="#source_readDoubleLE">#</a> <i>source</i>.<b>readDoubleLE</b>() [<>](https://github.com/mbostock/file-source/blob/master/source/read/doubleLE.js "Source")

Advances this source’s position by eight bytes, and returns a promise that yields a little-endian double from the underlying file. See [*buffer*.readDoubleLE](https://nodejs.org/api/buffer.html#buffer_buf_readdoublele_offset_noassert).

<a name="source_readFloatBE" href="#source_readFloatBE">#</a> <i>source</i>.<b>readFloatBE</b>() [<>](https://github.com/mbostock/file-source/blob/master/source/read/floatBE.js "Source")

Advances this source’s position by eight bytes, and returns a promise that yields a big-endian float from the underlying file. See [*buffer*.readFloatBE](https://nodejs.org/api/buffer.html#buffer_buf_readfloatbe_offset_noassert).

<a name="source_readFloatLE" href="#source_readFloatLE">#</a> <i>source</i>.<b>readFloatLE</b>() [<>](https://github.com/mbostock/file-source/blob/master/source/read/floatLE.js "Source")

Advances this source’s position by eight bytes, and returns a promise that yields a little-endian float from the underlying file. See [*buffer*.readFloatLE](https://nodejs.org/api/buffer.html#buffer_buf_readfloatle_offset_noassert).

<a name="source_readInt8" href="#source_readInt8">#</a> <i>source</i>.<b>readInt8</b>() [<>](https://github.com/mbostock/file-source/blob/master/source/read/int8.js "Source")

Advances this source’s position by one byte, and returns a promise that yields a signed integer from the underlying file. See [*buffer*.readInt8](https://nodejs.org/api/buffer.html#buffer_buf_readint8_offset_noassert).

<a name="source_readInt16BE" href="#source_readInt16BE">#</a> <i>source</i>.<b>readInt16BE</b>() [<>](https://github.com/mbostock/file-source/blob/master/source/read/int16BE.js "Source")

Advances this source’s position by two bytes, and returns a promise that yields a big-endian signed integer from the underlying file. See [*buffer*.readInt16BE](https://nodejs.org/api/buffer.html#buffer_buf_readint16be_offset_noassert).

<a name="source_readInt16LE" href="#source_readInt16LE">#</a> <i>source</i>.<b>readInt16LE</b>() [<>](https://github.com/mbostock/file-source/blob/master/source/read/int16LE.js "Source")

Advances this source’s position by two bytes, and returns a promise that yields a little-endian signed integer from the underlying file. See [*buffer*.readInt16LE](https://nodejs.org/api/buffer.html#buffer_buf_readint16le_offset_noassert).

<a name="source_readInt32BE" href="#source_readInt32BE">#</a> <i>source</i>.<b>readInt32BE</b>() [<>](https://github.com/mbostock/file-source/blob/master/source/read/int32BE.js "Source")

Advances this source’s position by four bytes, and returns a promise that yields a big-endian signed integer from the underlying file. See [*buffer*.readInt32BE](https://nodejs.org/api/buffer.html#buffer_buf_readint32be_offset_noassert).

<a name="source_readInt32LE" href="#source_readInt32LE">#</a> <i>source</i>.<b>readInt32LE</b>() [<>](https://github.com/mbostock/file-source/blob/master/source/read/int32LE.js "Source")

Advances this source’s position by four bytes, and returns a promise that yields a big-endian signed integer from the underlying file. See [*buffer*.readInt32LE](https://nodejs.org/api/buffer.html#buffer_buf_readint32le_offset_noassert).

<a name="source_readIntBE" href="#source_readIntBE">#</a> <i>source</i>.<b>readIntBE</b>(<i>length</i>) [<>](https://github.com/mbostock/file-source/blob/master/source/read/intBE.js "Source")

Advances this source’s position by *length* bytes, where length is between one and six, inclusive, and returns a promise that yields a big-endian signed integer from the underlying file. See [*buffer*.readIntBE](https://nodejs.org/api/buffer.html#buffer_buf_readintbe_offset_bytelength_noassert).

<a name="source_readIntLE" href="#source_readIntLE">#</a> <i>source</i>.<b>readIntLE</b>(<i>length</i>) [<>](https://github.com/mbostock/file-source/blob/master/source/read/intLE.js "Source")

Advances this source’s position by *length* bytes, where length is between one and six, inclusive, and returns a promise that yields a big-endian signed integer from the underlying file. See [*buffer*.readIntLE](https://nodejs.org/api/buffer.html#buffer_buf_readintle_offset_bytelength_noassert).

<a name="source_readUInt8" href="#source_readUInt8">#</a> <i>source</i>.<b>readUInt8</b>() [<>](https://github.com/mbostock/file-source/blob/master/source/read/uint8.js "Source")

Advances this source’s position by one byte, and returns a promise that yields an unsigned integer from the underlying file. See [*buffer*.readUInt8](https://nodejs.org/api/buffer.html#buffer_buf_readuint8_offset_noassert).

<a name="source_readUInt16BE" href="#source_readUInt16BE">#</a> <i>source</i>.<b>readUInt16BE</b>() [<>](https://github.com/mbostock/file-source/blob/master/source/read/uint16BE.js "Source")

Advances this source’s position by two bytes, and returns a promise that yields a big-endian unsigned integer from the underlying file. See [*buffer*.readUInt16BE](https://nodejs.org/api/buffer.html#buffer_buf_readuint16be_offset_noassert).

<a name="source_readUInt16LE" href="#source_readUInt16LE">#</a> <i>source</i>.<b>readUInt16LE</b>() [<>](https://github.com/mbostock/file-source/blob/master/source/read/uint16LE.js "Source")

Advances this source’s position by two bytes, and returns a promise that yields a little-endian unsigned integer from the underlying file. See [*buffer*.readUInt16LE](https://nodejs.org/api/buffer.html#buffer_buf_readuint16le_offset_noassert).

<a name="source_readUInt32BE" href="#source_readUInt32BE">#</a> <i>source</i>.<b>readUInt32BE</b>() [<>](https://github.com/mbostock/file-source/blob/master/source/read/uint32BE.js "Source")

Advances this source’s position by four bytes, and returns a promise that yields a big-endian unsigned integer from the underlying file. See [*buffer*.readUInt32BE](https://nodejs.org/api/buffer.html#buffer_buf_readuint32be_offset_noassert).

<a name="source_readUInt32LE" href="#source_readUInt32LE">#</a> <i>source</i>.<b>readUInt32LE</b>() [<>](https://github.com/mbostock/file-source/blob/master/source/read/uint32LE.js "Source")

Advances this source’s position by four bytes, and returns a promise that yields a little-endian unsigned integer from the underlying file. See [*buffer*.readUInt32LE](https://nodejs.org/api/buffer.html#buffer_buf_readuint32le_offset_noassert).

<a name="source_readUIntBE" href="#source_readUIntBE">#</a> <i>source</i>.<b>readUIntBE</b>(<i>length</i>) [<>](https://github.com/mbostock/file-source/blob/master/source/read/uintBE.js "Source")

Advances this source’s position by *length* bytes, where *length* is between one and six, inclusive, and returns a promise that yields a big-endian unsigned integer from the underlying file. See [*buffer*.readUIntBE](https://nodejs.org/api/buffer.html#buffer_buf_readuintbe_offset_bytelength_noassert).

<a name="source_readUIntLE" href="#source_readUIntLE">#</a> <i>source</i>.<b>readUIntLE</b>(<i>length</i>) [<>](https://github.com/mbostock/file-source/blob/master/source/read/uintLE.js "Source")

Advances this source’s position by *length* bytes, where *length* is between one and six, inclusive, and returns a promise that yields a little-endian unsigned integer from the underlying file. See [*buffer*.readUIntLE](https://nodejs.org/api/buffer.html#buffer_buf_readuintle_offset_bytelength_noassert).

<a name="source_seek" href="#source_seek">#</a> <i>source</i>.<b>seek</b>(<i>position</i>) [<>](https://github.com/mbostock/file-source/blob/master/source/seek.js "Source")

Sets this source’s position to the specified *position* and returns this source.

<a name="source_skip" href="#source_skip">#</a> <i>source</i>.<b>skip</b>(<i>length</i>) [<>](https://github.com/mbostock/file-source/blob/master/source/skip.js "Source")

Sets this source’s position to the current position plus the specified *length* and returns this source.

<a name="source_close" href="#source_close">#</a> <i>source</i>.<b>close</b>() [<>](https://github.com/mbostock/file-source/blob/master/source/close.js "Source")

Returns a promise that yields a closed file source.
