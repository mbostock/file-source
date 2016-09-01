function Source() {
  this._fd = null;
  this._position = 0;
}

Source.prototype.open = require("./open");
Source.prototype.read = require("./read/index");
Source.prototype.readString = require("./read/string");
Source.prototype.readDoubleBE = require("./read/doubleBE");
Source.prototype.readDoubleLE = require("./read/doubleLE");
Source.prototype.readFloatBE = require("./read/floatBE");
Source.prototype.readFloatLE = require("./read/floatLE");
Source.prototype.readInt8 = require("./read/int8");
Source.prototype.readInt16BE = require("./read/int16BE");
Source.prototype.readInt16LE = require("./read/int16LE");
Source.prototype.readInt32BE = require("./read/int32BE");
Source.prototype.readInt32LE = require("./read/int32LE");
Source.prototype.readIntBE = require("./read/intBE");
Source.prototype.readIntLE = require("./read/intLE");
Source.prototype.readUInt8 = require("./read/uint8");
Source.prototype.readUInt16BE = require("./read/uint16BE");
Source.prototype.readUInt16LE = require("./read/uint16LE");
Source.prototype.readUInt32BE = require("./read/uint32BE");
Source.prototype.readUInt32LE = require("./read/uint32LE");
Source.prototype.readUIntBE = require("./read/uintBE");
Source.prototype.readUIntLE = require("./read/uintLE");
Source.prototype.seek = require("./seek");
Source.prototype.skip = require("./skip");
Source.prototype.close = require("./close");

module.exports = Source;
