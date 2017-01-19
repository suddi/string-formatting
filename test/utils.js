'use strict';

const expect = require('chai').expect;
const rewire = require('rewire');

const Utils = rewire('../lib/utils');

function getNum(value) {
    return Utils.__get__('getNum')(value);
}

describe('Unit Tests for lib/utils.js', function () {
    context('Testing Utils.getNum', function () {
        it('CASE 1: response for string should be the string length', function () {
            const input = 'Hello World!';
            const expectedResult = input.length;

            const output = getNum(input);

            expect(output).to.be.eql(expectedResult);
        });

        it('CASE 2: response for Object should be the length', function () {
            const input = {answer: 42};
            const expectedResult = input.length;

            const output = getNum(input);

            expect(output).to.be.eql(expectedResult);
        });

        it('CASE 3: response for Array should be the length', function () {
            const input = [4, 5, 6];
            const expectedResult = input.length;

            const output = getNum(input);

            expect(output).to.be.eql(expectedResult);
        });

        it('CASE 4: response for integer should be the value', function () {
            const input = 4;
            const expectedResult = input;

            const output = getNum(input);

            expect(output).to.be.eql(expectedResult);
        });

        it('CASE 5: response for float should be the value', function () {
            const input = 4.2;
            const expectedResult = input;

            const output = getNum(input);

            expect(output).to.be.eql(expectedResult);
        });

        it('CASE 6: response for boolean `true` should be 1', function () {
            const input = true;
            const expectedResult = Number(input);

            const output = getNum(input);

            expect(output).to.be.eql(expectedResult);
        });

        it('CASE 7: response for boolean `false` should be 0', function () {
            const input = false;
            const expectedResult = Number(input);

            const output = getNum(input);

            expect(output).to.be.eql(expectedResult);
        });

        it('CASE 8: response for Function should be 0', function () {
            const input = function () {
                return 42;
            };
            const expectedResult = 0;

            const output = getNum(input);

            expect(output).to.be.eql(expectedResult);
        });
    });

    context('Testing Utils.sumArray', function () {
        it('CASE 1: sumArray works as expected', function () {
            const input = [3, 4, 5];
            const expectedResult = input[0] + input[1] + input[2];

            const output = Utils.sumArray(input);

            expect(output).to.be.eql(expectedResult);
        });
    });
});
