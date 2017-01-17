'use strict';

const Validator = require('./validator');
const Options = require('./options');

/**
 * Validate inputString
 * @param  {string} inputString - string input for formatting
 * @return {string} validated string input
 *
 * @example
 * validateInputString('Hello World!') // => 'Hello World!'
 * validateInputString('   ') // => ''
 * validateInputString('') // => ''
 */
function validateInputString(inputString) {
    return Validator
        .init('inputString', inputString)
        .isStr()
        .isRequired()
        .value
        .trim();
}

module.exports.apply = function (inputString, opts) {
    const options = Options.get(opts);
    validateInputString(inputString);

    if (inputString.length <= options.lengthOfLine[0]) {
        return [inputString];
    }

    return inputString.split(options.tokenRegex);
};
