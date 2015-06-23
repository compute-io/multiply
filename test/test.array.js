/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	multiply = require( './../lib/array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'array multiply', function tests() {

	it( 'should export a function', function test() {
		expect( multiply).to.be.a( 'function' );
	});

	it( 'should multiply an array by a scalar', function test() {
		var data, actual, expected;

		data = [
			1,
			2,
			3,
			4,
			5
		];
		actual = new Array( data.length );

		actual = multiply( actual, data, 2 );

		expected = [
			2,
			4,
			6,
			8,
			10
		];

		assert.deepEqual( actual, expected );

		// Typed arrays...
		data = new Int32Array( data );
		actual = new Int32Array( data.length );

		actual = multiply( actual, data, 2 );
		expected = new Int32Array( expected );

		assert.deepEqual( actual, expected );
	});

	it( 'should multiply an array element-wise with another array', function test() {
		var data, actual, expected, y;

		data = [
			1,
			2,
			3,
			4,
			5
		];

	 	y = [
			1,
			2,
			3,
			4,
			5
		];
		actual = new Array( data.length );

		actual = multiply( actual, data, y );

		expected = [
			1,
			4,
			9,
			16,
			25
		];

		assert.deepEqual( actual, expected );

		// Typed arrays...
		data = new Int32Array( data );
		actual = new Int32Array( data.length );

		actual = multiply( actual, data, y );
		expected = new Int32Array( expected );

		assert.deepEqual( actual, expected );
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( multiply( [], [], 1 ), [] );
		assert.deepEqual( multiply( new Int8Array(), new Int8Array(), 1 ), new Int8Array() );
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected, y;

		data = [ true, null, [], {} ];
		actual = new Array( data.length );
		actual = multiply( actual, data, 1 );

		expected = [ NaN, NaN, NaN, NaN ];

		assert.deepEqual( actual, expected );

		actual = new Array( data.length );
		y = [ 1, 2, 3, 4 ];
		actual = multiply( actual, data, y );

		expected = [ NaN, NaN, NaN, NaN ];

		assert.deepEqual( actual, expected );
	});

	it( 'should throw an error if provided an array to be added which is not of equal length to the input array', function test() {
		expect( foo ).to.throw( Error );
		function foo() {
			multiply( [], [1,2], [1,2,3] );
		}
	});

});
