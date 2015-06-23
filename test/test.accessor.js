/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	multiply = require( './../lib/accessor.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'accessor multiply', function tests() {

	it( 'should export a function', function test() {
		expect( multiply ).to.be.a( 'function' );
	});

	it( 'should perform an element-wise multiplication of a scalar using an accessor', function test() {
		var data, actual, expected;

		data = [
			{'x':0},
			{'x':1},
			{'x':2},
			{'x':3}
		];
		actual = new Array( data.length );
		actual = multiply( actual, data, 2, getValue );

		expected = [
			0,
			2,
			4,
			6
		];

		assert.deepEqual( actual, expected );

		function getValue( d ) {
			return d.x;
		}

	});

	it( 'should perform an element-wise multiplication of an array using an accessor', function test() {
		var data, actual, expected, y;

		data = [
			{'x':0},
			{'x':1},
			{'x':2},
			{'x':3}
		];

		y = [
			0,
			1,
			2,
			3
		];

		actual = new Array( data.length );
		actual = multiply( actual, data, y, getValue );

		expected = [
			0,
			1,
			4,
			9
		];

		assert.deepEqual( actual, expected );

		function getValue( d, i ) {
			return d.x;
		}

	});

	it( 'should perform an element-wise multiplication of another object array using an accessor', function test() {
		var data, actual, expected, y;

		data = [
			{'x':0},
			{'x':1},
			{'x':2},
			{'x':3}
		];

		y = [
			{'y':0},
			{'y':1},
			{'y':2},
			{'y':3}
		];

		actual = new Array( data.length );
		actual = multiply( actual, data, y, getValue );

		expected = [
			0,
			1,
			4,
			9
		];

		assert.deepEqual( actual, expected );

		function getValue( d, i, j ) {
			if ( j === 0 ) {
				return d.x;
			} else {
				return d.y;
			}
		}

	});

	it( 'should return empty array if provided an empty array', function test() {
		assert.deepEqual( multiply( [], [], 1, getValue ), [] );
		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected, y;

		data = [
			{'x':1},
			{'x':null},
			{'x':3}
		];
		actual = new Array( data.length );
		actual = multiply( actual, data, 1, getValue );

		expected = [ 1, NaN, 3 ];

		assert.deepEqual( actual, expected );

		// numeric array
		y = [ 1, 2, 3 ];
		actual = new Array( data.length );
		actual = multiply( actual, data, y, getValue );
		expected = [ 1, NaN, 9 ];

		function getValue( d, i ) {
			return d.x;
		}

		// object array
		y = [
			{'y':1},
			{'y':2},
			{'y':3}
		];
		actual = new Array( data.length );
		actual = multiply( actual, data, y, getValue2 );
		expected = [ 1, NaN, 9 ];

		function getValue2( d, i, j ) {
			if ( j === 0 ) {
				return d.x;
			} else {
				return d.y;
			}
		}

	});

	it( 'should throw an error if provided an array to be multiplied which is not of equal length to the input array', function test() {
		expect( foo ).to.throw( Error );
		function foo() {
			multiply( [], [1,2], [1,2,3], getValue );
		}
		function getValue( d ) {
			return d;
		}
	});

});
