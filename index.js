var fs = require("fs");

function noop() {}

function Task(callback) {
  this.callback = callback;
  this.next = null;
}

function Source(path) {
  this._error = null;
  this._buffer = new Buffer(64 * 1024);
  this._fd = null;
  this._position = null;
  this._open = false;
  this._active = false;
  this._end = false;
  this._head = this._tail = null;
  this._path = path + "";
}

exports.source = source;
exports.open = source_open;

function source(path) {
  return new Source(path);
}

function source_open(path, callback) {
  return source(path).open(callback);
}

var source_prototype = source.prototype = Source.prototype;

function defer(source, callback) {
  var task = new Task(callback);
  if (source._tail) source._tail.next = task;
  else source._head = task;
  source._tail = task;
  return source;
}

function step(source) {
  var task = source._head;
  if (task) {
    if (!(source._head = task.next)) source._tail = null;
    process.nextTick(task.callback);
  }
}

function open(source, callback) {
  source._active = true;
  fs.open(source._path, "r", function(error, fd) {
    source._active = false;
    source._fd = fd;
    source._position = 0;
    step(source);
    callback(source._error = error);
  });
  return source;
}

function close(source, callback) {
  source._active = true;
  fs.close(source._fd, function(error) {
    source._active = false;
    step(source);
    callback(source._error = error);
  });
  return source;
}

function afterclose(source, error, buffer, callback) {
  callback(source._error = error, buffer);
}

function read(source, length, callback) {
  source._active = true;

  // Increase the buffer size, if it’s not already big enough.
  if (source._buffer.length < length) source._buffer = new Buffer(1 << Math.ceil(Math.log(length) / Math.LN2));

  // Now read the requested bytes into the buffer!
  // If an error occurs, or EOF is reached, automatically close the file.
  (function reread(offset) {
    fs.read(source._fd, source._buffer, offset, length - offset, source._position, function(error, readLength) {
      source._active = false;
      if (error || !readLength) return close(source, afterclose.bind(null, source, error, !error && offset ? source._buffer.slice(0, offset) : null, callback));
      source._position += readLength, offset += readLength;
      if (offset < length) return reread(offset);
      step(source);
      callback(null, source._buffer.slice(0, length));
    });
  })(0);
  return source;
}

source_prototype.open = function(callback) {
  var source = this;

  // Validate the arguments.
  if (callback == null) callback = noop;
  else if (typeof callback !== "function") throw new Error("callback must be a function"); // TODO optional

  // If this source is already open, report a synchronous error.
  if (source._open) throw new Error("already open");
  source._open = true;

  // If this source is active, defer until the current task completes.
  return source._active
      ? defer(source, open.bind(null, source, callback))
      : open(source, callback);
};

source_prototype.read = function(length, callback) {
  var source = this;

  // Validate the arguments.
  length = +length;
  if (callback == null) callback = noop;
  else if (typeof callback !== "function") throw new Error("invalid callback");

  // If this source is not open, throw a synchronous error.
  if (!source._open) throw new Error("not open");

  // If this source is ended or errored, notify the callback.
  if (source._end || source._error) return process.nextTick(callback, source._error, null), source;

  // If this source is active, defer until the current task completes.
  return source._active
      ? defer(source, read.bind(null, source, length, callback))
      : read(source, length, callback);
};

source_prototype.close = function(callback) {
  var source = this;

  // Validate the arguments.
  if (callback == null) callback = noop;
  else if (typeof callback !== "function") throw new Error("invalid callback");

  // If this source is already closed, report a synchronous error.
  if (!source._open) throw new Error("already closed");
  source._open = false;

  // If this source is ended or errored, notify the callback.
  if (source._end || source._error) return process.nextTick(callback, source._error, null), source;

  // If this source is active, defer until the current task completes.
  return source._active
      ? defer(source, close.bind(null, source, callback))
      : close(source, callback);
};
