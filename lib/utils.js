'use strict';

/**
 * Get numeric to compute for different types
 * @param  {*} value - value to compute numeric for
 * @return {number} computed numeric for the value
 *
 * @example
 * getNum('Hello World!') // => 12
 * getNum([3, 4, 5]) // => 3
 * getNum(-1) // => -1
 * getNum(true) // => 1
 * getNum(false) // => 0
 * getNum(function () {}) // => 0
 */
function getNum(value) {
    switch (typeof value) {
        case 'string':
        case 'object':
            return value.length;
        case 'number':
            return value;
        case 'boolean':
            return Number(value);
        default:
            return 0;
    }
}

/**
 * Sum an array of various types
 * @param  {Array} value - array of various types of values
 * @return {number} summed up values from array
 *
 * @example
 * sumArray(['Hello', 'World']) // => 10
 * sumArray([[3, 4, 5], [1, 2]]) // => 5
 * sumArray([3, 1, -1, 4]) // => 7
 * sumArray([true, false, true]) // => 2
 */
function sumArray(value) {
    return value.reduce(function (prev, v) {
        return prev + getNum(v);
    }, 0);
}

module.exports = {
    sumArray: sumArray
};
