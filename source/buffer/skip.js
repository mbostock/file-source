module.exports = function(length) {
  if (this._source._active) throw new Error("concurrent operation");
  var offset = this._offset + (length |= 0);
  if (offset < 0 || offset >= this._buffer.length) this.seek(this._source._position + offset);
  else this._offset = offset;
  return this;
};
