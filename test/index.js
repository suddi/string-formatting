'use strict';

const fs = require('fs');
const path = require('path');
const expect = require('chai').expect;

const StringFormatter = require('../lib');

function getFixturesPath(filename) {
    const directory = 'fixtures';
    if (filename) {
        return path.join(__dirname, directory, filename);
    }
    return path.join(__dirname, directory);
}

describe('Integration Tests for string-formatting', function () {
    const filenames = fs.readdirSync(getFixturesPath()).filter(function (filename) {
        return filename.endsWith('.js');
    });

    filenames.map(function (filename, index) {
        it(`CASE ${index + 1}: Testing ${filename}`, function () {
            const T = require(getFixturesPath(filename));
            const input = T.getInput();
            const output = StringFormatter.apply(input.inputString, input.opts);

            expect(output).to.deep.eql(T.getOutput());
        });
        return filename;
    });
});
