'use strict';

module.exports.getInput = function () {
    return {
        inputString: 'Hello World!',
        opts: {
            numLines: 0
        }
    };
};

module.exports.getOutput = function () {
    return [
        'Hello World!'
    ];
};
