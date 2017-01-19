'use strict';

module.exports.getInput = function () {
    return {
        inputString: 'Hello World!',
        opts: {
            numLines: 2,
            lengthOfLine: [5, 7],
            firstLineRequired: true,
            splitTokenRegex: /[aeiou]+/
        }
    };
};

module.exports.getOutput = function () {
    return [
        'H, ll',
        'W, rld!'
    ];
};
