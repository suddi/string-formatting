'use strict';

const Validator = require('../../lib/validator');

module.exports.getInput = function () {
    return {
        inputString: 'Hello World!',
        opts: {
            numLines: 2,
            lengthOfLine: 'test'
        }
    };
};

module.exports.getOutput = function () {
    return new Error(Validator.getMessage('Elements of lengthOfLine must be of Integer type'));
};
