var Writable = require('stream').Writable;
require('util').inherits(EchoStream, Writable);

function EchoStream(array) {
  Writable.call(this, { objectMode: true });
  this._array = array;
};

EchoStream.prototype._write = function (chunk, encoding, done) {
  this._array.push(chunk);
  done();
}

module.exports = function (array) {
  return new EchoStream(array);
};