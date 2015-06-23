'use strict';

// MODULES //

var isArrayLike = require( 'validate.io-array-like' );


// MULTIPLY //

/**
* FUNCTION: multiply( out, arr, y, clbk )
*	Computes an element-wise multiplication of an array using an accessor.
*
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} arr - input array
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Number} y - either an array of equal length or a scalar
* @param {Function} accessor - accessor function for accessing array values
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function multiply( out, arr, y, clbk ) {
	var len = arr.length,
		i,
		arrVal, yVal;

	if ( isArrayLike( y ) ) {
		if ( len !== y.length ) {
			throw new Error( 'multiply()::invalid input argument. Array to be multiplied must have a length equal to that of the input array.' );
		}
		if (  typeof y[ 0 ] === 'number' ) {
			// y is number array -> callback does not have to be applied
			for ( i = 0; i < len; i++ ) {
				arrVal = clbk( arr[ i ], i, 0 );
				if ( typeof y[ i ] === 'number' && typeof arrVal === 'number' ) {
					out[ i ] = arrVal * y[ i ];
				} else {
					out[ i ] = NaN;
				}
			}
		} else {
			// y is an object array, too -> callback is applied
			for ( i = 0; i < len; i++ ) {
				arrVal = clbk( arr[ i ], i, 0 );
				yVal = clbk( y[ i ], i, 1 );
				if ( typeof arrVal === 'number' && typeof yVal  === 'number' ) {
					out[ i ] = arrVal * yVal;
				} else {
					out[ i ] = NaN;
				}
			}
		}
	} else {
		for ( i = 0; i < len; i++ ) {
			arrVal = clbk( arr[ i ], i );
			if ( typeof arrVal === 'number' ) {
				out[ i ] = arrVal * y;
			} else {
				out[ i ] = NaN;
			}
		}
	}
	return out;
} // end FUNCTION multiply()


// EXPORTS //

module.exports = multiply;