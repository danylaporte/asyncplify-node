[![npm version](https://badge.fury.io/js/asyncplify-node.svg)](http://badge.fury.io/js/asyncplify-node)

# asyncplify-node
[asyncplify](https://github.com/danylaporte/asyncplify/tree/master/doc) operators for working with streams and events.

## Installation

```bash
$ npm install asyncplify-node
```

## Documentation

### fromStream(stream)
read the content from a stream (readable, transformable or writable)

Example:
```js
	asyncplifyNode
		.fromStream(createReadableStream())
		.subscribe();
```

### toStream(options)
write the content of an observable to a writable stream.

options:

- stream: Stream Object
- encoding: String
- objectMode: Boolean default = false

Example:

```js
	asyncplify
		.fromArray([1, 2, 3, 4])
		.pipe(asyncplifyNode.toStream(createWriteStream('file.txt')));
```

## License ##
The MIT License (MIT)

Copyright (c) 2015 Dany Laporte