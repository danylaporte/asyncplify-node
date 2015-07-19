var asyncplify = require('asyncplify');
var lib = require('../index');
var should = require('should');
var writableStream = require('./writableStream');


describe('toStream', function () {

	it('should emit values', function () {
		var array = [];

		asyncplify
			.range(5)
			.pipe(lib.toStream({ objectMode: true, stream: writableStream(array) }));

		array.should.eql([0, 1, 2, 3, 4]);
	});

	it('should write to console', function () {

		asyncplify
			.range(5)
			.pipe(lib.toStream({ stream: process.stdout }));
	});
});