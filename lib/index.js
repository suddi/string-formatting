'use strict';

const Input = require('./input');
const Options = require('./options');
const Utils = require('./utils');

/**
 * Prepare indexed objects used throughout the formatter
 * @param  {Array} values - values Array to index
 * @param  {number} index - index, so that there is no object manipulation
 * @return {Object} indexed object
 *
 * @example
 * getIndexedObject([3, 4, 5], 2) // => {values: [3, 4, 5], index: 2}
 */
function getIndexedObject(values, index) {
    return {
        values: values,
        index: index
    };
}

/**
 * A test function for the base case, to be used in the recursive calls
 * @param  {Object} words - indexed words object
 * @param  {Object} lengthOfLines - indexed length of lines object
 * @param  {string} currentLine - currently compiled line
 * @param  {Array} formattedArray - current formatted array
 * @return {Array} final result to return from string-formatting
 *
 * @example
 * testBaseCase({values: [2, 3], index: 0}, {values: [2, 3], index: 0}, '', []) // =>
 * testBaseCase({values: [2, 3], index: 2}, {values: [2, 3], index: 0}, '', [1, 2]) // => [1, 2]
 * testBaseCase({values: [2, 3], index: 2}, {values: [2, 3], index: 0}, 'test', [1, 2]) // => [1, 2, 'test']
 * testBaseCase({values: [2, 3], index: 0}, {values: [2, 3], index: 2}, 'test', [1, 2]) // => []
 */
function testBaseCase(words, lengthOfLines, currentLine, formattedArray) {
    if (words.index === words.values.length) {
        return currentLine ? formattedArray.concat(currentLine) : formattedArray;
    } else if (lengthOfLines.index === lengthOfLines.values.length) {
        return [];
    }
}

/**
 * Handle the case when currentLine is defined, called from formatString
 * @param  {Object} words - indexed words object
 * @param  {Object} lengthOfLines - indexed length of lines object
 * @param  {string} mergeToken - the mergeToken to merge strings with
 * @param  {string} currentLine - currently compiled line
 * @param  {Array} formattedArray - current formatted array
 * @return {Array} final result to return from string-formatting
 */
function handleLineDefined(words, lengthOfLines, mergeToken, currentLine, formattedArray) {
    const currentWord = words.values[words.index].trim();
    const currentWordLength = currentWord.length;
    const currentLength = lengthOfLines.values[lengthOfLines.index];

    const computedLength = currentLine.length + mergeToken.length + currentWordLength;

    if (computedLength < currentLength) {
        return formatString(
            getIndexedObject(words.values, words.index + 1),
            getIndexedObject(lengthOfLines.values, lengthOfLines.index),
            mergeToken,
            `${currentLine}${mergeToken}${currentWord}`,
            formattedArray
        );
    } else if (computedLength > currentLength) {
        return formatString(
            getIndexedObject(words.values, words.index),
            getIndexedObject(lengthOfLines.values, lengthOfLines.index + 1),
            mergeToken,
            '',
            formattedArray.concat(currentLine)
        );
    }

    return formatString(
        getIndexedObject(words.values, words.index + 1),
        getIndexedObject(lengthOfLines.values, lengthOfLines.index + 1),
        mergeToken,
        '',
        formattedArray.concat(`${currentLine}${mergeToken}${currentWord}`)
    );
}

/**
 * Handle the case when currentLine is undefined, called from formatString
 * @param  {Object} words - indexed words object
 * @param  {Object} lengthOfLines - indexed length of lines object
 * @param  {string} mergeToken - the mergeToken to merge strings with
 * @param  {string} currentLine - currently compiled line
 * @param  {Array} formattedArray - current formatted array
 * @return {Array} final result to return from string-formatting
 */
function handleLineUndefined(words, lengthOfLines, mergeToken, currentLine, formattedArray) {
    const currentWord = words.values[words.index].trim();
    const currentWordLength = currentWord.length;
    const currentLength = lengthOfLines.values[lengthOfLines.index];

    if (currentWordLength < currentLength) {
        return formatString(
            getIndexedObject(words.values, words.index + 1),
            getIndexedObject(lengthOfLines.values, lengthOfLines.index),
            mergeToken,
            currentWord,
            formattedArray
        );
    } else if (currentWordLength > currentLength) {
        return formatString(
            getIndexedObject(words.values, words.index),
            getIndexedObject(lengthOfLines.values, lengthOfLines.index + 1),
            mergeToken,
            '',
            formattedArray.concat('')
        );
    }

    return formatString(
        getIndexedObject(words.values, words.index + 1),
        getIndexedObject(lengthOfLines.values, lengthOfLines.index + 1),
        mergeToken,
        '',
        formattedArray.concat(currentWord)
    );
}

/**
 * Format the strings into an array
 * @param  {Object} words - indexed words object
 * @param  {Object} lengthOfLines - indexed length of lines object
 * @param  {string} mergeToken - the mergeToken to merge strings with
 * @param  {string} currentLine - currently compiled line
 * @param  {Array} formattedArray - current formatted array
 * @return {Array} final result to return from string-formatting
 */
function formatString(words, lengthOfLines, mergeToken, currentLine, formattedArray) {
    const finalValue = testBaseCase(words, lengthOfLines, currentLine, formattedArray);
    if (finalValue) {
        return finalValue;
    }

    if (currentLine) {
        return handleLineDefined(words, lengthOfLines, mergeToken, currentLine, formattedArray);
    }
    return handleLineUndefined(words, lengthOfLines, mergeToken, currentLine, formattedArray);
}

/**
 * Main function for string-formatting
 * @param  {string} inputString - input string to format
 * @param  {Object} opts - options for string formatting
 * @return {Array} formatted strings in an Array
 *
 * @example
 * apply('Hello World!', {lengthOfLine: [5, 6]}) // => ['Hello', 'World!']
 * apply('Hello World! I am Node.js', {numLines: 2, lengthOfLine: 12}) // => ['Hello World!', 'I am Node.js']
 * apply('Hello World!', {lengthOfLine: [2, 100], firstLineRequired: false}) // => ['', 'Hello World!']
 * apply('Hello World!', {lengthOfLine: [4, 6], splitTokenRegex: /[aeiou]/, mergeToken: ';'}) // => ['H;ll', 'W;rld!']
 */
function apply(inputString, opts) {
    const input = Input.get(inputString);
    const options = Options.get(opts);
    const maximumLength = Utils.sumArray(options.lengthOfLine);

    if (input.length <= options.lengthOfLine[0]) {
        return [input];
    }

    const splitInput = input.split(options.splitTokenRegex);
    if (Utils.sumArray(splitInput) > maximumLength) {
        return [];
    }
    if (options.firstLineRequired &&
        splitInput[0].length > options.lengthOfLine[0]) {
        return [];
    }

    return formatString(
        getIndexedObject(splitInput, 0),
        getIndexedObject(options.lengthOfLine, 0),
        options.mergeToken,
        '',
        []
    );
}

module.exports = {
    apply: apply
};
