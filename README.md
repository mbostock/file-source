# file-source

Read binary files in chunks, on demand, with promises. To load:

```js
var file = require("file-source");
```

To read a file *hello* in two parts, and then close it safely:

```js
var hello = file.source();

hello.open("test/hello.txt")
  .then(function() { console.log("opened"); return hello.read(5); })
  .then(function(buffer) { console.log(buffer); return hello.skip(2).readString(5); })
  .then(function(string) { console.log(string); })
  .catch(function(error) { return hello.close().then(function() { throw error; }); })
  .then(function() { return hello.close(); })
  .then(function() { console.log("closed"); })
  .catch(function(error) { console.error(error.stack); });
```

Or, to avoid the local variable:

```js
file.open("test/hello.txt")
  .then(function(hello) {
    console.log("opened");
    return hello.read(5)
      .then(function(buffer) { console.log(buffer); return hello.skip(2).readString(5); })
      .then(function(string) { console.log(string); })
      .catch(function(error) { return hello.close().then(function() { throw error; }); })
      .then(function() { return hello.close(); });
  })
  .then(function() { console.log("closed"); })
  .catch(function(error) { console.error(error.stack); });
```

See also:

* The promise-y [binary-file](https://github.com/marvinroger/node-binary-file) by Marvin Roger
* The fluent [binary-reader](https://github.com/gagle/node-binary-reader) by Gabriel Llamas
* The [history of streams](http://dominictarr.com/post/145135293917/history-of-streams), [pull streams](http://dominictarr.com/post/149248845122/pull-streams-pull-streams-are-a-very-simple) and [pull-reader](https://github.com/dominictarr/pull-reader) by Dominic Tarr
* A discussion on [binary pull streams](https://github.com/pull-stream/pull-stream/issues/15)
* A discussion on [fs.read](https://groups.google.com/d/msg/nodejs/3Gv_4EqSAOc/yJxGmjq-9YMJ)

## API Reference

<a name="source" href="#source">#</a> <i>file</i>.<b>source</b>() [<>](https://github.com/mbostock/file-source/blob/master/index.js#L3 "Source")

Returns a new file source. For example:

```js
var hello = file.source();
```

The source is initially closed; use [*file*.open](#open) or [*source*.open](#source_open) to open a file.

<a name="open" href="#open">#</a> <i>file</i>.<b>open</b>(<i>path</i>) [<>](https://github.com/mbostock/file-source/blob/master/index.js#L7 "Source")

Returns a promise that yields an open file source for the specified *path*. A convenience method equivalent to:

```js
file.source().open(path)
```

For example:

```js
file.open("hello.txt")
  .then(function(hello) { console.log("opened", hello); return hello.close(); })
  .catch(function(error) { console.error(error.stack); });
```

<a name="source_open" href="#source_open">#</a> <i>source</i>.<b>open</b>(<i>path</i>) [<>](https://github.com/mbostock/file-source/blob/master/source/open.js "Source")

Returns a promise that yields an open file source for the specified *path*, positioned at the start of the file. For example:

```js
var hello = file.source();

hello.open("hello.txt")
  .then(function() { console.log("opened", hello); return hello.close(); })
  .catch(function(error) { console.error(error.stack); });
```

Yields an error if this source is not closed or if there was an error opening the underlying file. In this case, this source is still considered closed, and you can use this source to open another file if desired.

After opening, you can call [*source*.close](#source_close) to close the file. After closing, you can re-open a source with the same or different path, if desired. If this source was created using [*file*.open](#open), the yielded source is already open, and you don’t need to call this method.

<a name="source_read" href="#source_read">#</a> <i>source</i>.<b>read</b>(<i>length</i>) [<>](https://github.com/mbostock/file-source/blob/master/source/read.js "Source")

Advances this source’s position by *length* bytes and returns a promise that yields a buffer containing bytes \[*position*, … *position* + *length* - 1\], inclusive, from the underlying file. If the file is shorter than *position* + *length*, the yielded buffer may contain fewer than *length* bytes. For example:

```js
var file = require("file-source");

file.open("hello.txt")
  .then(function(hello) {
    return hello.read(5)
      .then(function(buffer) { console.log(buffer); })
      .catch(function(error) { return hello.close().then(function() { throw error; }); })
      .then(function() { return hello.close(); });
  })
  .then(function() { console.log("closed"); })
  .catch(function(error) { console.error(error.stack); });
```

<a name="source_readString" href="#source_readString">#</a> <i>source</i>.<b>readString</b>(<i>length</i>[, <i>encoding</i>]) [<>](https://github.com/mbostock/file-source/blob/master/source/read/string.js "Source")

[Reads](#source_read) *length* bytes, returning a promise that yields a string from the underlying file. If *encoding* is not specified, it defaults to “utf8”. If not enough bytes remain in the file, the string may derived from a buffer containing fewer than *length* bytes. See [*buffer*.toString](https://nodejs.org/api/buffer.html#buffer_buf_tostring_encoding_start_end).

<a name="source_readDoubleBE" href="#source_readDoubleBE">#</a> <i>source</i>.<b>readDoubleBE</b>() [<>](https://github.com/mbostock/file-source/blob/master/source/read/doubleBE.js "Source")

[Reads](#source_read) eight bytes, returning a promise that yields a big-endian double from the underlying file. If not enough bytes remain in the file, yields null. See [*buffer*.readDoubleBE](https://nodejs.org/api/buffer.html#buffer_buf_readdoublebe_offset_noassert).

<a name="source_readDoubleLE" href="#source_readDoubleLE">#</a> <i>source</i>.<b>readDoubleLE</b>() [<>](https://github.com/mbostock/file-source/blob/master/source/read/doubleLE.js "Source")

[Reads](#source_read) eight bytes, returning a promise that yields a little-endian double from the underlying file. If not enough bytes remain in the file, yields null. See [*buffer*.readDoubleLE](https://nodejs.org/api/buffer.html#buffer_buf_readdoublele_offset_noassert).

<a name="source_readFloatBE" href="#source_readFloatBE">#</a> <i>source</i>.<b>readFloatBE</b>() [<>](https://github.com/mbostock/file-source/blob/master/source/read/floatBE.js "Source")

[Reads](#source_read) eight bytes, returning a promise that yields a big-endian float from the underlying file. If not enough bytes remain in the file, yields null. See [*buffer*.readFloatBE](https://nodejs.org/api/buffer.html#buffer_buf_readfloatbe_offset_noassert).

<a name="source_readFloatLE" href="#source_readFloatLE">#</a> <i>source</i>.<b>readFloatLE</b>() [<>](https://github.com/mbostock/file-source/blob/master/source/read/floatLE.js "Source")

[Reads](#source_read) eight bytes, returning a promise that yields a little-endian float from the underlying file. If not enough bytes remain in the file, yields null. See [*buffer*.readFloatLE](https://nodejs.org/api/buffer.html#buffer_buf_readfloatle_offset_noassert).

<a name="source_readInt8" href="#source_readInt8">#</a> <i>source</i>.<b>readInt8</b>() [<>](https://github.com/mbostock/file-source/blob/master/source/read/int8.js "Source")

[Reads](#source_read) one byte, and returns a promise that yields a signed integer from the underlying file. If not enough bytes remain in the file, yields null. See [*buffer*.readInt8](https://nodejs.org/api/buffer.html#buffer_buf_readint8_offset_noassert).

<a name="source_readInt16BE" href="#source_readInt16BE">#</a> <i>source</i>.<b>readInt16BE</b>() [<>](https://github.com/mbostock/file-source/blob/master/source/read/int16BE.js "Source")

[Reads](#source_read) two bytes, returning a promise that yields a big-endian signed integer from the underlying file. If not enough bytes remain in the file, yields null. See [*buffer*.readInt16BE](https://nodejs.org/api/buffer.html#buffer_buf_readint16be_offset_noassert).

<a name="source_readInt16LE" href="#source_readInt16LE">#</a> <i>source</i>.<b>readInt16LE</b>() [<>](https://github.com/mbostock/file-source/blob/master/source/read/int16LE.js "Source")

[Reads](#source_read) two bytes, returning a promise that yields a little-endian signed integer from the underlying file. If not enough bytes remain in the file, yields null. See [*buffer*.readInt16LE](https://nodejs.org/api/buffer.html#buffer_buf_readint16le_offset_noassert).

<a name="source_readInt32BE" href="#source_readInt32BE">#</a> <i>source</i>.<b>readInt32BE</b>() [<>](https://github.com/mbostock/file-source/blob/master/source/read/int32BE.js "Source")

[Reads](#source_read) four bytes, returning a promise that yields a big-endian signed integer from the underlying file. If not enough bytes remain in the file, yields null. See [*buffer*.readInt32BE](https://nodejs.org/api/buffer.html#buffer_buf_readint32be_offset_noassert).

<a name="source_readInt32LE" href="#source_readInt32LE">#</a> <i>source</i>.<b>readInt32LE</b>() [<>](https://github.com/mbostock/file-source/blob/master/source/read/int32LE.js "Source")

[Reads](#source_read) four bytes, returning a promise that yields a big-endian signed integer from the underlying file. If not enough bytes remain in the file, yields null. See [*buffer*.readInt32LE](https://nodejs.org/api/buffer.html#buffer_buf_readint32le_offset_noassert).

<a name="source_readIntBE" href="#source_readIntBE">#</a> <i>source</i>.<b>readIntBE</b>(<i>length</i>) [<>](https://github.com/mbostock/file-source/blob/master/source/read/intBE.js "Source")

[Reads](#source_read) *length* bytes, where length is between one and six, inclusive, and returns a promise that yields a big-endian signed integer from the underlying file. If not enough bytes remain in the file, yields null. See [*buffer*.readIntBE](https://nodejs.org/api/buffer.html#buffer_buf_readintbe_offset_bytelength_noassert).

<a name="source_readIntLE" href="#source_readIntLE">#</a> <i>source</i>.<b>readIntLE</b>(<i>length</i>) [<>](https://github.com/mbostock/file-source/blob/master/source/read/intLE.js "Source")

[Reads](#source_read) *length* bytes, where length is between one and six, inclusive, and returns a promise that yields a big-endian signed integer from the underlying file. If not enough bytes remain in the file, yields null. See [*buffer*.readIntLE](https://nodejs.org/api/buffer.html#buffer_buf_readintle_offset_bytelength_noassert).

<a name="source_readUInt8" href="#source_readUInt8">#</a> <i>source</i>.<b>readUInt8</b>() [<>](https://github.com/mbostock/file-source/blob/master/source/read/uint8.js "Source")

[Reads](#source_read) one byte, and returns a promise that yields an unsigned integer from the underlying file. If not enough bytes remain in the file, yields null. See [*buffer*.readUInt8](https://nodejs.org/api/buffer.html#buffer_buf_readuint8_offset_noassert).

<a name="source_readUInt16BE" href="#source_readUInt16BE">#</a> <i>source</i>.<b>readUInt16BE</b>() [<>](https://github.com/mbostock/file-source/blob/master/source/read/uint16BE.js "Source")

[Reads](#source_read) two bytes, returning a promise that yields a big-endian unsigned integer from the underlying file. If not enough bytes remain in the file, yields null. See [*buffer*.readUInt16BE](https://nodejs.org/api/buffer.html#buffer_buf_readuint16be_offset_noassert).

<a name="source_readUInt16LE" href="#source_readUInt16LE">#</a> <i>source</i>.<b>readUInt16LE</b>() [<>](https://github.com/mbostock/file-source/blob/master/source/read/uint16LE.js "Source")

[Reads](#source_read) two bytes, returning a promise that yields a little-endian unsigned integer from the underlying file. If not enough bytes remain in the file, yields null. See [*buffer*.readUInt16LE](https://nodejs.org/api/buffer.html#buffer_buf_readuint16le_offset_noassert).

<a name="source_readUInt32BE" href="#source_readUInt32BE">#</a> <i>source</i>.<b>readUInt32BE</b>() [<>](https://github.com/mbostock/file-source/blob/master/source/read/uint32BE.js "Source")

[Reads](#source_read) four bytes, returning a promise that yields a big-endian unsigned integer from the underlying file. If not enough bytes remain in the file, yields null. See [*buffer*.readUInt32BE](https://nodejs.org/api/buffer.html#buffer_buf_readuint32be_offset_noassert).

<a name="source_readUInt32LE" href="#source_readUInt32LE">#</a> <i>source</i>.<b>readUInt32LE</b>() [<>](https://github.com/mbostock/file-source/blob/master/source/read/uint32LE.js "Source")

[Reads](#source_read) four bytes, returning a promise that yields a little-endian unsigned integer from the underlying file. If not enough bytes remain in the file, yields null. See [*buffer*.readUInt32LE](https://nodejs.org/api/buffer.html#buffer_buf_readuint32le_offset_noassert).

<a name="source_readUIntBE" href="#source_readUIntBE">#</a> <i>source</i>.<b>readUIntBE</b>(<i>length</i>) [<>](https://github.com/mbostock/file-source/blob/master/source/read/uintBE.js "Source")

[Reads](#source_read) *length* bytes, where *length* is between one and six, inclusive, and returns a promise that yields a big-endian unsigned integer from the underlying file. If not enough bytes remain in the file, yields null. See [*buffer*.readUIntBE](https://nodejs.org/api/buffer.html#buffer_buf_readuintbe_offset_bytelength_noassert).

<a name="source_readUIntLE" href="#source_readUIntLE">#</a> <i>source</i>.<b>readUIntLE</b>(<i>length</i>) [<>](https://github.com/mbostock/file-source/blob/master/source/read/uintLE.js "Source")

[Reads](#source_read) *length* bytes, where *length* is between one and six, inclusive, and returns a promise that yields a little-endian unsigned integer from the underlying file. If not enough bytes remain in the file, yields null. See [*buffer*.readUIntLE](https://nodejs.org/api/buffer.html#buffer_buf_readuintle_offset_bytelength_noassert).

<a name="source_seek" href="#source_seek">#</a> <i>source</i>.<b>seek</b>(<i>position</i>) [<>](https://github.com/mbostock/file-source/blob/master/source/seek.js "Source")

Sets this source’s position to the specified *position* and returns this source.

<a name="source_skip" href="#source_skip">#</a> <i>source</i>.<b>skip</b>(<i>length</i>) [<>](https://github.com/mbostock/file-source/blob/master/source/skip.js "Source")

Sets this source’s position to the current position plus the specified *length* and returns this source.

<a name="source_close" href="#source_close">#</a> <i>source</i>.<b>close</b>() [<>](https://github.com/mbostock/file-source/blob/master/source/close.js "Source")

Returns a promise that yields a closed file source.
