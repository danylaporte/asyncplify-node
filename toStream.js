var Asyncplify = require('asyncplify');

function identity(x) { return x; }
function toString(x) { return String(x); }

function ToStream(options, source) {

	var self = this;
	
	this.drain = function () {
		self.source.setState(Asyncplify.states.RUNNING);
	};

	this.encoding = options && options.encoding;
	this.mapper = options && options.objectMode ? identity : toString;
	this.source = null;
	this.stream = options && options.stream || options;
	this.stream.on('drain', this.drain);

	source._subscribe(this);
}

ToStream.prototype = {
	emit: function (item) {
		if (!this.stream.write(this.mapper(item), this.encoding))
			this.source.setState(Asyncplify.states.PAUSED);
	},
	end: function (err) {
		this.source = null;
		if (err) this.stream.emit('error', err);
		if (!this.stream._isStdio) this.stream.end();
		this.stream.removeListener('drain', this.drain);
	}
};

module.exports = function (options) {
	return function (source) {
		new ToStream(options, source);
	};
};