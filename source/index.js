function Source() {
  this._active = false;
  this._fd = null;
  this._position = 0;
}

var prototype = Source.prototype;
prototype.open = require("./open");
prototype.read = require("./read/index");
prototype.readString = require("./read/string");
prototype.readDoubleBE = require("./read/doubleBE");
prototype.readDoubleLE = require("./read/doubleLE");
prototype.readFloatBE = require("./read/floatBE");
prototype.readFloatLE = require("./read/floatLE");
prototype.readInt8 = require("./read/int8");
prototype.readInt16BE = require("./read/int16BE");
prototype.readInt16LE = require("./read/int16LE");
prototype.readInt32BE = require("./read/int32BE");
prototype.readInt32LE = require("./read/int32LE");
prototype.readIntBE = require("./read/intBE");
prototype.readIntLE = require("./read/intLE");
prototype.readUInt8 = require("./read/uint8");
prototype.readUInt16BE = require("./read/uint16BE");
prototype.readUInt16LE = require("./read/uint16LE");
prototype.readUInt32BE = require("./read/uint32BE");
prototype.readUInt32LE = require("./read/uint32LE");
prototype.readUIntBE = require("./read/uintBE");
prototype.readUIntLE = require("./read/uintLE");
prototype.seek = require("./seek");
prototype.skip = require("./skip");
prototype.close = require("./close");

module.exports = Source;
