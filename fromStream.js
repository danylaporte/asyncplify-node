var Asyncplify = require('asyncplify');

function FromStream(stream, sink) {
	this.sink = sink;
	this.sink.source = this;
	this.stream = stream;

	var self = this;

	this.fromStreamEmit = function (item) {
		self.sink.emit(item);
	};

	this.fromStreamEnd = function () {
		self.sink.end(null);
		self.setState(Asyncplify.states.CLOSED);
	};

	this.fromStreamError = function (err) {
		self.sink.end(err);
		self.setState(Asyncplify.states.CLOSED);
	};

	this.stream.on('data', this.fromStreamEmit);
	this.stream.on('error', this.fromStreamError);
	this.stream.on(this.stream.write ? 'finish' : 'end', this.fromStreamEnd);
	this.stream.resume();
}

FromStream.prototype.setState = function (state) {
	if (this.stream) {
		switch (state) {
			case Asyncplify.states.RUNNING:
				this.stream.resume();
				break;
			case Asyncplify.states.PAUSED:
				this.stream.pause();
				break;
			case Asyncplify.states.CLOSED:
				this.stream.removeListener('data', this.fromStreamEmit);
				this.stream.removeListener('error', this.fromStreamError);
				this.stream.removeListener(this.stream.write ? 'finish' : 'end', this.fromStreamEnd);
				this.stream = null;
		}
	}
};

module.exports = function (options) {
	return new Asyncplify(FromStream, options);
};