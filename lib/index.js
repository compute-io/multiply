/**
*
*	COMPUTE: multiply
*
*
*	DESCRIPTION:
*		- Computes an element-wise multiplication of a numeric array.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

'use strict';

// MULTIPLY //

/**
* FUNCTION: multiply( arr, x )
*	Computes an element-wise multiplication of an array.
*
* @param {Array} arr - numeric array
* @param {Array|Number} x - either an array of equal length or a scalar
*/
function multiply( arr, x ) {
	var isArray = Array.isArray( x ),
		len,
		i;

	if ( !Array.isArray( arr ) ) {
		throw new TypeError( 'multiply()::invalid input argument. Must provide an array.' );
	}
	len = arr.length;
	if ( !isArray && ( typeof x !== 'number' || x !== x ) ) {
		throw new TypeError( 'multiply()::invalid input argument. Second argument must be either an array or a scalar.' );
	}
	if ( isArray ) {
		if ( len !== x.length ) {
			throw new Error( 'multiply()::invalid input argument. Arrays must be of equal length.' );
		}
		for ( i = 0; i < len; i++ ) {
			arr[ i ] *= x[ i ];
		}
		return;
	}
	for ( i = 0; i < len; i++ ) {
		arr[ i ] *= x;
	}
} // end FUNCTION multiply()


// EXPORTS //

module.exports = multiply;
