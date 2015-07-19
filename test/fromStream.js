var lib = require('../index');
var tests = require('asyncplify-tests');
var readableStream = require('./readableStream');


describe('fromStream', function () {
	lib.fromStream(readableStream()).pipe(tests.itShouldClose());
	lib.fromStream(readableStream()).pipe(tests.itShouldEmitValues([1, 2, 3, 4, 5]));
});