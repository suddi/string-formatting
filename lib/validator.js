'use strict';

/**
 * Get message for throwing validation errors
 * @param  {*} message - error message
 * @return {string} error message with prefix added
 *
 * @example
 * getMessage('Hello World!') // => '[string-formatting] Hello World!'
 * getMessage(42) // => '[string-formatting] 42'
 */
function getMessage(message) {
    return `[string-formatting] ${message}`;
}

/**
 * Tests whether a value is set or not
 * @param  {*} value - value to validate
 * @return {Boolean} whether validation passes
 *
 * @example
 * isSet() // => false
 * isSet(null) // => false
 * isSet('') // => true
 * isSet('hello') // => true
 * isSet(0) // => true
 * isSet(1) // => true
 */
function isSet(value) {
    return typeof value !== 'undefined' && value !== null;
}

/**
 * Wraps a function
 * @param  {Function} func - function to be wrapped
 * @return {Function} wrapped function
 *
 * @example
 * wrap(function (a, b) { return a + b; }).call({fieldname: 4, value: 5}) // => {fieldname: 4, value: 5}
 */
function wrap(func) {
    return function () {
        const args = Array.prototype.slice.call(arguments);
        func.apply(null, [this.fieldname, this.value].concat(args));
        return this;
    };
}

/**
 * Initializer function for validation
 * @param  {string} fieldname - fieldname to respond in error
 * @param  {boolean} value - value to be validated
 * @return {Object} initialized validator functions
 */
function init(fieldname, value) {
    return {
        fieldname: fieldname,
        value: value,

        // Validation functions
        isBoolean: wrap(isBoolean),
        isInt: wrap(isInt),
        isRegex: wrap(isRegex),
        isStr: wrap(isStr),

        // Array checker
        arrayOf: wrap(arrayOf),

        isRequired: wrap(isRequired)
    };
}

/**
 * Validate whether a value is a Boolean
 * @param  {string} fieldname - fieldname to respond in error
 * @param  {boolean} value - value to validate
 * @return {boolean} whether validation passes
 *
 * @example
 * isBoolean('a', true) // => true
 * isBoolean('a', false) // => true
 * isBoolean() // => true
 */
function isBoolean(fieldname, value) {
    if (isSet(value) && typeof value !== 'boolean') {
        throw new Error(getMessage(`${fieldname} must be of Boolean type`));
    }
    return true;
}

/**
 * Validate whether a value is an Integer
 * @param  {string} fieldname - fieldname to respond in error
 * @param  {boolean} value - value to validate
 * @return {boolean} whether validation passes
 *
 * @example
 * isInt('a', 0) // => true
 * isInt('a', -1) // => true
 * isInt('a', 1) // => true
 * isInt() // => true
 */
function isInt(fieldname, value) {
    if (isSet(value) && !Number.isInteger(value)) {
        throw new Error(getMessage(`${fieldname} must be of Integer type`));
    }
    return true;
}

/**
 * Validate whether a value is a RegExp
 * @param  {string} fieldname - fieldname to respond in error
 * @param  {RegExp} value - value to validate
 * @return {boolean} whether validation passes
 *
 * @example
 * isRegex('a', //) // => true
 * isRegex('a', /, /) // => true
 * isRegex() // => true
 */
function isRegex(fieldname, value) {
    if (isSet(value) && !(value instanceof RegExp)) {
        throw new Error(getMessage(`${fieldname} must be of RegExp type`));
    }
    return true;
}

/**
 * Validate whether a value is a String
 * @param  {string} fieldname - fieldname to respond in error
 * @param  {boolean} value - value to validate
 * @return {boolean} whether validation passes
 *
 * @example
 * isStr('a', 'hello') // => true
 * isStr('a', '') // => true
 * isStr() // => true
 */
function isStr(fieldname, value) {
    if (isSet(value) && typeof value !== 'string') {
        throw new Error(getMessage(`${fieldname} must be of String type`));
    }
    return true;
}

/**
 * Validate whether a value is an Array, as well as its elements
 * @param  {string} fieldname - fieldname to respond in error
 * @param  {boolean} value - value to validate
 * @param  {Function} func - validator function for Array elements
 * @return {boolean} whether validation passes
 *
 * @example
 * arrayOf('a', []) // => true
 * arrayOf('a', [3, 4]) // => true
 * arrayOf('a', [3, 3], function (v) { return v === 3; }) // => true
 * arrayOf() // => true
 */
function arrayOf(fieldname, value, func) {
    if (isSet(value) && !Array.isArray(value)) {
        throw new Error(getMessage(`${fieldname} must be of Array type`));
    } else if (Array.isArray(value) && typeof func === 'function') {
        value.map(func);
    }

    return true;
}

/**
 * Validate whether a value is set
 * @param  {string} fieldname - fieldname to respond in error
 * @param  {boolean} value - value to validate
 * @return {boolean} whether validation passes
 *
 * @example
 * isRequired('a', []) // => true
 * isRequired('a', '') // => true
 * isRequired('a', 'Hello World!') // => true
 * isRequired('a', 0) // => true
 * isRequired('a', 42.1) // => true
 * isRequired('a', true) // => true
 * isRequired('a', false) // => true
 */
function isRequired(fieldname, value) {
    if (!isSet(value)) {
        throw new Error(getMessage(`${fieldname} is required`));
    }
    return true;
}

module.exports = {
    getMessage: getMessage,
    init: init
};
