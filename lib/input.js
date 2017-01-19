'use strict';

const Validator = require('./validator');

/**
 * Validate and sanitize inputString
 * @param  {string} inputString - string input for formatting
 * @return {string} validated string input
 *
 * @example
 * get('Hello World!') // => 'Hello World!'
 * get('   ') // => ''
 * get('') // => ''
 */
function get(inputString) {
    return Validator
        .init('inputString', inputString)
        .isStr()
        .isRequired()
        .value
        .trim();
}

module.exports = {
    get: get
};
