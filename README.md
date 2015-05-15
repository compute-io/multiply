Multiply
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes an element-wise multiplication.


## Installation

``` bash
$ npm install compute-multiply
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var multiply = require( 'compute-multiply' );
```

#### multiply( arr, x[, opts] )

Computes an element-wise multiplication. `x` may be either an `array` of equal length or a `numeric` value.

``` javascript
var arr = [ 2, 1, 4, 2 ],
	out;

out = multiply( arr, -4 );
// returns [ -8, -4, -16, -8 ]

out = multiply( arr, [ 1, 2, 3, 3 ] );
// returns [ 2, 2, 12, 6 ]
```

The function accepts the following `options`:

*  __copy__: `boolean` indicating whether to return a new `array`. Default: `true`.
*  __accessor__: accessor `function` for accessing values in object `arrays`.

To mutate the input `array` (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var arr = [ 5, 3, 8, 3, 2 ];

var out = multiply( arr, 4, {
	'copy': false
});
// returns [ 20, 12, 32, 12, 8 ]

console.log( arr === out );
// returns true
```

__Note__: mutation is the `array` equivalent of an __times-equal__ (`*=`).

For object `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var data = [
	['beep', 5],
	['boop', 3],
	['bip', 8],
	['bap', 3],
	['baz', 2]
];

function getValue( d, i ) {
	return d[ 1 ];
}

var out = multiply( data, 4, {
	'accessor': getValue
});
// returns [ 20, 12, 32, 12, 8 ]
```

When multiplying values between two object `arrays`, provide an accessor `function` which accepts `3` arguments.

``` javascript
var data = [
	['beep', 5],
	['boop', 3],
	['bip', 8],
	['bap', 3],
	['baz', 2]
];

var arr = [
	{'x': 4},
	{'x': 5},
	{'x': 6},
	{'x': 5},
	{'x': 3}
];

function getValue( d, i, j ) {
	if ( j === 0 ) {
		return d[ 1 ];
	}
	return d.x;
}

var out = multiply( data, arr, {
	'accessor': getValue
});
// returns [ 20, 15, 48, 15, 6 ]
```

__Note__: `j` corresponds to the input `array` index, where `j=0` is the index for the first input `array` and `j=1` is the index for the second input `array`.




## Examples

``` javascript
var multiply = require( 'compute-multiply' );

var data = new Array( 100 );
for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random()*100 );
}

var out = multiply( data, 10 );

console.log( out.join( '\n' ) );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```



## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT). 


## Copyright

Copyright &copy; 2014-2015. The Compute.io Authors.


[npm-image]: http://img.shields.io/npm/v/compute-multiply.svg
[npm-url]: https://npmjs.org/package/compute-multiply

[travis-image]: http://img.shields.io/travis/compute-io/multiply/master.svg
[travis-url]: https://travis-ci.org/compute-io/multiply

[coveralls-image]: https://img.shields.io/coveralls/compute-io/multiply/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/multiply?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/multiply.svg
[dependencies-url]: https://david-dm.org/compute-io/multiply

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/multiply.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/multiply

[github-issues-image]: http://img.shields.io/github/issues/compute-io/multiply.svg
[github-issues-url]: https://github.com/compute-io/multiply/issues
