'use strict';

const expect = require('chai').expect;
const rewire = require('rewire');

const Validator = rewire('../lib/validator');

function arrayOf(fieldname, value, func) {
    try {
        return Validator.__get__('arrayOf')(fieldname, value, func);
    } catch (error) {
        return error;
    }
}

function isRequired(fieldname, value) {
    try {
        return Validator.__get__('isRequired')(fieldname, value);
    } catch (error) {
        return error;
    }
}

describe('Unit Tests for lib/validator.js', function () {
    context('Testing Validator.arrayOf', function () {
        it('CASE 1: arrayOf tests for array correctly', function () {
            const fieldname = 'test';
            const value = [3, 4, 5];

            const expectedResult = true;
            const output = arrayOf(fieldname, value);

            expect(output).to.be.eql(expectedResult);
        });

        it('CASE 2: arrayOf throws error when value is not Array', function () {
            const fieldname = 'test';
            const value = 42;

            const expectedResult = new Error(Validator.getMessage(`${fieldname} must be of Array type`));
            const output = arrayOf(fieldname, value);

            expect(output.message).to.be.eql(expectedResult.message);
        });
    });

    context('Testing Validator.isRequired', function () {
        it('CASE 1: isRequired tests correctly when value exists', function () {
            const fieldname = 'test';
            const value = 42;

            const expectedResult = true;
            const output = isRequired(fieldname, value);

            expect(output).to.be.eql(expectedResult);
        });

        it('CASE 2: isRequired throws error when value does not exist', function () {
            const fieldname = 'test';

            const expectedResult = new Error(Validator.getMessage(`${fieldname} is required`));
            const output = isRequired(fieldname);

            expect(output.message).to.be.eql(expectedResult.message);
        });
    });
});
