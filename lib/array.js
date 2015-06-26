'use strict';

// MODULES //

var isArrayLike = require( 'validate.io-array-like' ),
	isTypedArrayLike = require( 'validate.io-typed-array-like' );


// MULTIPLY //

/**
* FUNCTION: multiply( out, arr, y )
*	Computes an element-wise multiplication of an array.
*
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} arr - input array
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Number} y - either an array of equal length or a scalar
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function multiply( out, arr, y ) {
	var len = arr.length,
		i;

	if ( isTypedArrayLike( y ) ) {
		if ( len !== y.length ) {
			throw new Error( 'multiply()::invalid input argument. Array to be multiplied must have a length equal to that of the input array.' );
		}
		for ( i = 0; i < len; i++ ) {
			if ( typeof arr[ i ] === 'number' ) {
				out[ i ] = arr[ i ] * y[ i ];
			} else {
				out[ i ] = NaN;
			}
		}
	} else if ( isArrayLike( y ) ) {
		if ( len !== y.length ) {
			throw new Error( 'multiply()::invalid input argument. Array to be multiplied must have a length equal to that of the input array.' );
		}
		for ( i = 0; i < len; i++ ) {
			if ( typeof y[ i ] === 'number' && typeof arr[ i ] === 'number' ) {
				out[ i ] = arr[ i ] * y[ i ];
			} else {
				out[ i ] = NaN;
			}
		}
	} else {
		if ( typeof y === 'number' ) {
			for ( i = 0; i < len; i++ ) {
				if ( typeof arr[ i ] === 'number' ) {
					out[ i ] = arr[ i ] * y;
				} else {
					out[ i ] = NaN;
				}
			}
		} else {
			for ( i = 0; i < len; i++ ) {
				out[ i ] = NaN;
			}
		}
	}
	return out;
} // end FUNCTION multiply()


// EXPORTS //

module.exports = multiply;
