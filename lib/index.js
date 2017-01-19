'use strict';

const Input = require('./input');
const Options = require('./options');
const Utils = require('./utils');

function getIndexedObject(values, index) {
    return {
        values: values,
        index: index
    };
}

function testBaseCase(words, lengthOfLines, currentLine, formattedArray) {
    if (words.index === words.values.length) {
        return currentLine ? formattedArray.concat(currentLine) : formattedArray;
    } else if (lengthOfLines.index === lengthOfLines.values.length) {
        return [];
    }
}

function handleLineDefined(words, lengthOfLines, mergeToken, currentLine, formattedArray) {
    const currentWord = words.values[words.index].trim();
    const currentWordLength = currentWord.length;
    const currentLength = lengthOfLines.values[lengthOfLines.index];

    const computedLength = currentLine.length + mergeToken.length + currentWordLength;

    if (computedLength < currentLength) {
        return formatString(
            getIndexedObject(words.values, words.index + 1),
            getIndexedObject(lengthOfLines.values, lengthOfLines.index),
            mergeToken,
            `${currentLine}${mergeToken}${currentWord}`,
            formattedArray
        );
    } else if (computedLength > currentLength) {
        return formatString(
            getIndexedObject(words.values, words.index),
            getIndexedObject(lengthOfLines.values, lengthOfLines.index + 1),
            mergeToken,
            '',
            formattedArray.concat(currentLine)
        );
    }

    return formatString(
        getIndexedObject(words.values, words.index + 1),
        getIndexedObject(lengthOfLines.values, lengthOfLines.index + 1),
        mergeToken,
        '',
        formattedArray.concat(`${currentLine}${mergeToken}${currentWord}`)
    );
}

function handleLineUndefined(words, lengthOfLines, mergeToken, currentLine, formattedArray) {
    const currentWord = words.values[words.index].trim();
    const currentWordLength = currentWord.length;
    const currentLength = lengthOfLines.values[lengthOfLines.index];

    if (currentWordLength < currentLength) {
        return formatString(
            getIndexedObject(words.values, words.index + 1),
            getIndexedObject(lengthOfLines.values, lengthOfLines.index),
            mergeToken,
            currentWord,
            formattedArray
        );
    } else if (currentWordLength > currentLength) {
        return formatString(
            getIndexedObject(words.values, words.index),
            getIndexedObject(lengthOfLines.values, lengthOfLines.index + 1),
            mergeToken,
            '',
            formattedArray.concat('')
        );
    }

    return formatString(
        getIndexedObject(words.values, words.index + 1),
        getIndexedObject(lengthOfLines.values, lengthOfLines.index + 1),
        mergeToken,
        '',
        formattedArray.concat(currentWord)
    );
}

function formatString(words, lengthOfLines, mergeToken, currentLine, formattedArray) {
    const finalValue = testBaseCase(words, lengthOfLines, currentLine, formattedArray);
    if (finalValue) {
        return finalValue;
    }

    if (currentLine) {
        return handleLineDefined(words, lengthOfLines, mergeToken, currentLine, formattedArray);
    }
    return handleLineUndefined(words, lengthOfLines, mergeToken, currentLine, formattedArray);
}

module.exports.apply = function (inputString, opts) {
    const input = Input.get(inputString);
    const options = Options.get(opts);
    const maximumLength = Utils.sumArray(options.lengthOfLine);

    if (input.length <= options.lengthOfLine[0]) {
        return [input];
    }

    const splitInput = input.split(options.splitTokenRegex);
    if (Utils.sumArray(splitInput) > maximumLength) {
        return [];
    }

    if (options.firstLineRequired &&
        splitInput[0].length > options.lengthOfLine[0]) {
        return [];
    }

    return formatString(
        getIndexedObject(splitInput, 0),
        getIndexedObject(options.lengthOfLine, 0),
        options.mergeToken,
        '',
        []
    );
};
