module.exports = function(length) {
  if (isNaN(length) || (length |= 0) < 0) throw new Error("invalid length");
  if (this._source._active) throw new Error("concurrent operation");
  var offset0 = this._offset, buffer0 = this._buffer, offset = offset0 - buffer0.length + length;
  return offset > 0 ? this._source.read(Math.max(this._size, offset)).then((buffer) => {
    this._offset = offset, this._buffer = buffer;
    return Buffer.concat([buffer0.slice(offset0), buffer.slice(0, offset)]);
  }) : (this._source._active = true, Promise.resolve(buffer0.slice(offset0, this._offset += length)).then((buffer) => {
    this._source._active = false;
    return buffer;
  }));
};
