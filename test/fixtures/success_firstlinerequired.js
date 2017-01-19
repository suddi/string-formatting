'use strict';

module.exports.getInput = function () {
    return {
        inputString: 'Hello World!',
        opts: {
            numLines: 2,
            lengthOfLine: [4, 100],
            firstLineRequired: false
        }
    };
};

module.exports.getOutput = function () {
    return [
        '',
        'Hello, World!'
    ];
};
