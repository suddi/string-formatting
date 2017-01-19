'use strict';

module.exports.getInput = function () {
    return {
        inputString: 'Hello World!',
        opts: {
            lengthOfLine: [5, 6],
            firstLineRequired: true
        }
    };
};

module.exports.getOutput = function () {
    return [
        'Hello',
        'World!'
    ];
};
