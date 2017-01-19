'use strict';

const Validator = require('../../lib/validator');

module.exports.getInput = function () {
    return {
        inputString: 'Hello World!',
        opts: {
            numLines: 2,
            lengthOfLine: [14, 15],
            firstLineRequired: 'test'
        }
    };
};

module.exports.getOutput = function () {
    return new Error(Validator.getMessage('firstLineRequired must be of Boolean type'));
};
