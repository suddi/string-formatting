'use strict';

module.exports.getInput = function () {
    return {
        inputString: 'Hello World! I am Node.js',
        opts: {
            numLines: 2,
            lengthOfLine: [14, 15],
            mergeToken: ';;;'
        }
    };
};

module.exports.getOutput = function () {
    return [];
};
