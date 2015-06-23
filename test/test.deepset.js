/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	multiply = require( './../lib/deepset.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'deepset multiply', function tests() {

	it( 'should export a function', function test() {
		expect( multiply ).to.be.a( 'function' );
	});

	it( 'should perform an element-wise multiplication using a scalar and deep set', function test() {
		var data, actual, expected;

		data = [
			{'x':0},
			{'x':1},
			{'x':2},
			{'x':3}
		];

		actual = multiply( data, 2, 'x' );

		expected = [
			{'x':0},
			{'x':2},
			{'x':4},
			{'x':6}
		];

		assert.strictEqual( data, actual );
		assert.deepEqual( data, expected);

		// Custom separator...
		data = [
			{'x':[9,0]},
			{'x':[9,1]},
			{'x':[9,2]},
			{'x':[9,3]}
		];

		data = multiply( data, 2, 'x/1', '/' );
		expected = [
			{'x':[9,0]},
			{'x':[9,2]},
			{'x':[9,4]},
			{'x':[9,6]}
		];

		assert.deepEqual( data, expected, 'custom separator' );
	});

	it( 'should perform an element-wise multiplication using an array and deep set', function test() {
		var data, actual, expected, y;

		data = [
			{'x':0},
			{'x':1},
			{'x':2},
			{'x':3}
		];

		y = [ 0, 1, 2, 3 ];

		actual = multiply( data, y, 'x' );

		expected = [
			{'x':0},
			{'x':1},
			{'x':4},
			{'x':9}
		];

		assert.strictEqual( data, actual );
		assert.deepEqual( data, expected);

		// Custom separator...
		data = [
			{'x':[9,0]},
			{'x':[9,1]},
			{'x':[9,2]},
			{'x':[9,3]}
		];

		data = multiply( data, y, 'x/1', '/' );
		expected = [
			{'x':[9,0]},
			{'x':[9,1]},
			{'x':[9,4]},
			{'x':[9,9]}
		];

		assert.deepEqual( data, expected, 'custom separator' );
	});

	it( 'should return an empty array if provided an empty array', function test() {
		var arr = [];
		assert.deepEqual( multiply( arr, 1, 'x' ), [] );
		assert.deepEqual( multiply( arr, 1, 'x', '/' ), [] );
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected, y;

		// multiplying with a scalar
		data = [
			{'x':[9,null]},
			{'x':[9,1]},
			{'x':[9,true]},
			{'x':[9,3]}
		];
		actual = multiply( data, 1, 'x.1' );
		expected = [
			{'x':[9,NaN]},
			{'x':[9,1]},
			{'x':[9,NaN]},
			{'x':[9,3]}
		];
		assert.deepEqual( data, expected );

		// multiplying with an array
		data = [
			{'x':[9,null]},
			{'x':[9,1]},
			{'x':[9,true]},
			{'x':[9,3]}
		];
		y = [ 0, 1, 2, 3];
		actual = multiply( data, y, 'x.1' );
		expected = [
			{'x':[9,NaN]},
			{'x':[9,1]},
			{'x':[9,NaN]},
			{'x':[9,9]}
		];
		assert.deepEqual( data, expected );
	});

});
