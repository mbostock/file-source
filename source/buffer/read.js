var serialize = require("../serialize"),
    clear = require("./clear");

module.exports = function(length) {
  if (isNaN(length) || (length |= 0) < 0) throw new Error("invalid length");
  var skip = this._skip, seek = this._seek;
  this._skip = 0, this._seek = null;
  return serialize(this, () => {
    var start = seek == null ? this._position + this._offset + skip : seek,
        i = start - this._position,
        j = i + length,
        n = this._buffer.length;

    // Is this range completely buffered?
    if (0 <= i && j <= n) return this._buffer.slice(i, this._offset = j);

    // Is the requested range bigger than the buffer size?
    if (length > this._size) this._size = Math.pow(2, Math.ceil(Math.log2(length))), clear(this);

    // Does the requested range start before the buffer?
    else if (i < 0) clear(this);

    // Does the requested range extend beyond the buffered end-of-file?
    else if (n && n < this._size) return this._buffer.slice(i, this._offset = n);

    // Is the starting part of the range buffered? Combine with the next chunk.
    else if (i < n) {
      this._position = this._source._position;
      return this._source.read(this._size).then(
        (buffer) => Buffer.concat([this._buffer.slice(i), (this._buffer = buffer).slice(0, this._offset = j - n)])
      );
    }

    // Otherwise, just read a fresh chunk.
    return this._source.seek(this._position = start).read(this._size).then(
      (buffer) => (this._buffer = buffer).slice(0, this._offset = length)
    );
  });
};
