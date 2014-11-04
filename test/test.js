'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	multiply = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-multiply', function tests() {

	it( 'should export a function', function test() {
		expect( multiply ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided a non-array', function test() {
		var values = [
				5,
				'5',
				{},
				true,
				null,
				undefined,
				NaN,
				function(){}
			];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				multiply( value, 0 );
			};
		}
	});

	it( 'should throw an error if not provided an array or number for the second argument', function test() {
		var values = [
				'5',
				{},
				true,
				null,
				undefined,
				NaN,
				function(){}
			];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				multiply( [], value );
			};
		}
	});

	it( 'should throw an error if provided arrays of unequal length', function test() {
		expect( foo ).to.throw( Error );
		function foo() {
			multiply( [1,2], [1,2,3] );
		}
	});

	it( 'should perform element-wise multiplication', function test() {
		var data, expected;

		data = [ 5, 2, 4, 1, 2 ];
		expected = [ 20, 8, 16, 4, 8 ];

		multiply( data, 4 );
		assert.deepEqual( data, expected );

		data = [ 5, 2, 4, 1, 2 ];
		expected = [ 25, 4, 16, 1, -2 ];

		multiply( data, [5,2,4,1,-1] );
		assert.deepEqual( data, expected );
	});

});
