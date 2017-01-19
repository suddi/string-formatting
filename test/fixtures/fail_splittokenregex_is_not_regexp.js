'use strict';

const Validator = require('../../lib/validator');

module.exports.getInput = function () {
    return {
        inputString: 'Hello World!',
        opts: {
            splitTokenRegex: 'test'
        }
    };
};

module.exports.getOutput = function () {
    return new Error(Validator.getMessage('splitTokenRegex must be of RegExp type'));
};
