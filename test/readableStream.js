var Readable = require('stream').Readable;
require('util').inherits(Counter, Readable);

function Counter() {
  Readable.call(this, { objectMode: true });
  this._max = 5;
  this._index = 1;
}

Counter.prototype._read = function () {
  var i = this._index++;
  if (i > this._max)
    this.push(null);
  else {
    this.push(i);
  }
};

module.exports = function () {
  return new Counter();
};