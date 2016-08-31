var open = require("./open"),
    read = require("./read"),
    close = require("./close");

module.exports = source;

function Source(path) {
  this._path = path + "";
  this._fd = null; // The current file descriptor.
  this._buffer = new Buffer(64 * 1024); // A buffer to read into.
  this._position = null; // The read position within the file.
  this._open = false; // Is the source (synchronously) open?
  this._active = false; // Are we currently opening, reading, or closing?
  this._end = false; // Was the end of file reached?
  this._error = null; // Did an error occur?
  this._head = this._tail = null; // A linked list of queued tasks.
}

function source(path) {
  return new Source(path);
}

function noop() {}

function Task(callback) {
  this.callback = callback;
  this.next = null;
}

function defer(source, callback) {
  var task = new Task(callback);
  if (source._tail) source._tail.next = task;
  else source._head = task;
  source._tail = task;
  return source;
}

var source_prototype = source.prototype = Source.prototype;

source_prototype.toString = function() {
  return path;
};

source_prototype.open = function(callback) {
  if (callback == null) callback = noop;
  else if (typeof callback !== "function") throw new Error("callback must be a function");
  if (this._open) throw new Error("already open");
  this._open = true;
  return this._active
      ? defer(this, open.bind(null, this, callback))
      : open(this, callback);
};

source_prototype.read = function(length, callback) {
  if (callback == null) callback = noop;
  else if (typeof callback !== "function") throw new Error("invalid callback");
  if (!this._open) throw new Error("not open");
  if (this._end || this._error) return process.nextTick(callback, this._error, null), this;
  return this._active
      ? defer(this, read.bind(null, this, +length, callback))
      : read(this, +length, callback);
};

source_prototype.close = function(callback) {
  if (callback == null) callback = noop;
  else if (typeof callback !== "function") throw new Error("invalid callback");
  if (!this._open) throw new Error("already closed");
  this._open = false;
  if (this._end || this._error) return process.nextTick(callback, this._error, null), this;
  return this._active
      ? defer(this, close.bind(null, this, callback))
      : close(this, callback);
};
