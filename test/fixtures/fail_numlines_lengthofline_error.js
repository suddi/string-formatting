'use strict';

const Validator = require('../../lib/validator');

module.exports.getInput = function () {
    return {
        inputString: 'Hello World!',
        opts: {
            numLines: 2,
            lengthOfLine: [5, 5, 3]
        }
    };
};

module.exports.getOutput = function () {
    return new Error(Validator.getMessage('numLines and lengthOfLine does not match'));
};
