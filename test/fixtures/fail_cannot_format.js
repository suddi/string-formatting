'use strict';

module.exports.getInput = function () {
    return {
        inputString: 'Hello World!',
        opts: {
            numLines: 2,
            lengthOfLine: 5,
            firstLineRequired: true
        }
    };
};

module.exports.getOutput = function () {
    return [];
};
