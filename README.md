# string-formatting

[![CircleCI](https://img.shields.io/circleci/project/github/suddi/string-formatting.svg)](https://circleci.com/gh/suddi/string-formatting)
[![codecov](https://codecov.io/gh/suddi/string-formatting/branch/master/graph/badge.svg)](https://codecov.io/gh/suddi/string-formatting)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/9e6b6ea7bc1a40e9ab11ab621949a83e)](https://www.codacy.com/app/Suddi/string-formatting)
[![npm](https://img.shields.io/npm/v/string-formatting.svg)](https://www.npmjs.com/package/string-formatting)
[![npm](https://img.shields.io/npm/dt/string-formatting.svg)](https://www.npmjs.com/package/string-formatting)
[![Greenkeeper badge](https://badges.greenkeeper.io/suddi/string-formatting.svg)](https://greenkeeper.io/)
[![David](https://img.shields.io/david/suddi/string-formatting.svg)](https://david-dm.org/suddi/string-formatting)
[![David](https://img.shields.io/david/dev/suddi/string-formatting.svg)](https://david-dm.org/suddi/string-formatting?type=dev)
[![license](https://img.shields.io/github/license/suddi/string-formatting.svg)](https://raw.githubusercontent.com/suddi/string-formatting/master/LICENSE)

[![coverage](https://codecov.io/gh/suddi/string-formatting/branch/master/graphs/commits.svg)](https://codecov.io/gh/suddi/string-formatting)

String formatting module for string beautification, splits string optimally over multiple lines.
Can be used for formatting addresses.

## Installation

````
npm install --save string-formatting
````

## API

````js
const StringFormatter = require('string-formatting');

StringFormatting.apply(<string-to-be-formatted>, <options>);
````

Default configuration, can be overriden with user-defined options:
````js
{
    numLines: 1,                            // number of lines to format to (numLines and lengthOfLine have overlapping use, please see below)
    lengthOfLine: [255],                    // length for each line as a number or length for each specific line in an Array (numLines and lengthOfLine have overlapping use, please see below)
    firstLineRequired: true,                // whether the first line in the array must have a value, else fail
    splitTokenRegex: / /,                   // regex to split the string with
    mergeToken: ' '                         // string to merge the string with in case multiple words join on the same line
};
````

**NOTE:** When both `numLines` defined and `lengthOfLine` is defined as an Array (where each line can have multiple lengths).
`string-formatting` requires that the `numLines` and the length of `lengthOfLine` Array be the same.
This is because in the scenario where `lengthOfLine` is defined per line, `numLines` is an extraneous value and can be omitted.

## Usage

````js
const StringFormatter = require('string-formatting');

const output = StringFormatting.apply('Hello World!', {
    lengthOfLine: [5, 6]                    // the first line is allowed to have a maximum length of 5, the second line, a maximum length of 6
});
console.log(output);
// ['Hello', 'World!']

const output = StringFormatting.apply('Hello World! I am Node.js', {
    numLines: 2,
    lengthOfLine: 12
});
console.log(output);
// ['Hello World!', 'I am Node.js']

const output = StringFormatting.apply('Hello World!', {
    lengthOfLine: [2, 100],
    firstLineRequired: false
});
console.log(output);
// ['', 'Hello World!']

const output = StringFormatting.apply('Hello World!', {
    lengthOfLine: [4, 6],
    splitTokenRegex: /[aeiou]/,
    mergeToken: ';'
});
console.log(output);
// ['H;ll', 'W;rld!']
````

For more workable examples, please see [fixtures](test/fixtures).

