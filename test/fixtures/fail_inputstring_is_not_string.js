'use strict';

const Validator = require('../../lib/validator');

module.exports.getInput = function () {
    return {
        inputString: 42,
        opts: {}
    };
};

module.exports.getOutput = function () {
    return new Error(Validator.getMessage('inputString must be of String type'));
};
