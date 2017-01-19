'use strict';

const Validator = require('./validator');

/**
 * A function to convert to Array if input value is not already an Array
 * @param  {*} value - input value that may or may not be an Array
 * @return {Array} Array output
 *
 * @example
 * convertArray(5) // => [5]
 * convertArray('hello') // => ['hello']
 * convertArray([4, 5, 6]) // => [4, 5, 6]
 * convertArray(['hello']) // ['hello']
 */
function convertArray(value) {
    return Array.isArray(value) ? value : [value];
}

/**
 * Handle numLines and lengthOfLine array
 * @param  {number} numLines - number of lines to create
 * @param  {number} numFromArray - number of lines to create from lengthOfLine
 * @return {number} validated number of lines to create
 *
 * @example
 * getLines(4, 4) // => 4
 * getLines(undefined, 4) // => 4
 * getLines('Hello World!', 4) // => 4
 * getLines(4.2, 4) // => 4
 */
function getLines(numLines, numFromArray) {
    if (Number.isInteger(numLines)) {
        if (numFromArray > 1 && numFromArray !== numLines) {
            throw new Error(Validator.getMessage('numLines and lengthOfLine does not match'));
        } else if (numLines >= 1) {
            return numLines;
        }
    }
    return numFromArray;
}

/**
 * Initialize and validate numLines
 * @param  {number} numLines - number of lines to create
 * @param  {Array|number} lengthOfLine - length of each line
 * @return {number} initialized and validated numLines value
 *
 * @example
 * getNumLines(10) // => 10
 * getNumLines(0) // => 1
 * getNumLines('hello') // => 1
 * getNumLines() // => 1
 * getNumLines(1, [255]) // => 1
 * getNumLines(4, [10, 10, 10, 10]) // => 4
 */
function getNumLines(numLines, lengthOfLine) {
    const value = getLines(
        numLines,
        Array.isArray(lengthOfLine) ? lengthOfLine.length : 1
    );
    return Validator
        .init('numLines', value)
        .isInt()
        .isRequired()
        .value;
}

/**
 * Initialize and validate lengthOfLine
 * @param  {number} numLines - number of lines to create
 * @param  {Array|number} lengthOfLine - length of each line
 * @return {Array} initialized and validated lengthOfLine value
 *
 * @example
 * getLengthOfLine(1, 100) // => [100]
 * getLengthOfLine(4, 100) // => [100, 100, 100, 100]
 * getLengthOfLine(undefined, 0) // => [0]
 * getLengthOfLine(2, [20, 10]) // => [20, 10]
 * getLengthOfLine() // => [255]
 */
function getLengthOfLine(numLines, lengthOfLine) {
    const lines = getLines(
        numLines,
        Array.isArray(lengthOfLine) ? lengthOfLine.length : 1
    );

    const value = lengthOfLine || lengthOfLine === 0 ? lengthOfLine : 255;
    const fillValue = function (v, l) {
        if (v.length === l) {
            return v;
        }
        return Array
            .apply(null, Array(lines))
            .map(function (returnValue) {
                return returnValue;
            }.bind(null, v[0]));
    };

    const filledValue = fillValue(convertArray(value), lines);
    return Validator
        .init('lengthOfLine', filledValue)
        .arrayOf(function (v) {
            return Validator
                .init('Elements of lengthOfLine', v)
                .isInt()
                .isRequired()
                .value;
        })
        .isRequired()
        .value;
}

/**
 * Initialize and validate firstLineRequired
 * @param  {boolean} firstLineRequired - whether first line is required
 * @return {boolean} initialized and validated firstLineRequired value
 *
 * @example
 * getFirstLineRequired(true) // => true
 * getFirstLineRequired(false) // => false
 * getFirstLineRequired() // => true
 */
function getFirstLineRequired(firstLineRequired) {
    const value = firstLineRequired || firstLineRequired === false ? firstLineRequired : true;
    return Validator
        .init('firstLineRequired', value)
        .isBoolean()
        .isRequired()
        .value;
}

/**
 * Initialize and validate splitTokenRegex
 * @param  {string} splitTokenRegex - regex for splitting inputString
 * @return {RegExp} initialized and validated splitTokenRegex
 *
 * @example
 * getSplitTokenRegex(/, /) // => new RegExp(', ')
 * getSplitTokenRegex(//g) // => new RegExp('', 'g')
 * getSplitTokenRegex() // => new RegExp(' ')
 */
function getSplitTokenRegex(splitTokenRegex) {
    return Validator
        .init('splitTokenRegex', splitTokenRegex ? splitTokenRegex : / /)
        .isRegex()
        .isRequired()
        .value;
}

/**
 * Initialize and validate mergeToken
 * @param  {string} mergeToken - string for merging inputString
 * @return {string} initialized and validated mergeToken
 *
 * @example
 * getMergeToken(' ') // => ' '
 * getMergeToken() // => ', '
 */
function getMergeToken(mergeToken) {
    return Validator
        .init('mergeToken', mergeToken || mergeToken === '' ? mergeToken : ', ')
        .isStr()
        .isRequired()
        .value;
}

/**
 * Retrieve all filled options set with default values as needed
 * @param  {Object} options - options for string-formatting lib
 * @return {Object} filled options
 *
 * @example
 * get({numLines: 0, lengthOfLine: 0, firstLineRequired: false, splitTokenRegex: /, /, mergeToken: 'x'})
 * // => {numLines: 1, lengthOfLine: [0], firstLineRequired: false, splitTokenRegex: new RegExp(', '), mergeToken: 'x'}
 * get({}) // => {numLines: 1, lengthOfLine: [255], firstLineRequired: true, splitTokenRegex: new RegExp(' '), mergeToken: ', '}
 */
function get(options) {
    return {
        numLines: getNumLines(options.numLines, options.lengthOfLine),
        lengthOfLine: getLengthOfLine(options.numLines, options.lengthOfLine),
        firstLineRequired: getFirstLineRequired(options.firstLineRequired),
        splitTokenRegex: getSplitTokenRegex(options.splitTokenRegex),
        mergeToken: getMergeToken(options.mergeToken)
    };
}

module.exports = {
    get: get
};
