const expect = require('chai').expect;
const isOddOrEven = require('./evenOrOdd.js').isOddOrEven;

describe('isOddOrEven', function () {
    //Testing for undefined
    it('should return undefined with a number parameter', function () {
        const actual = isOddOrEven(73);
        expect(actual).to.be.undefined;
    });

    //Testing for undefined
    it('should return undefined with a object parameter', function () {
        const actual = isOddOrEven({ name: 'Pesho', age: 30 });
        expect(actual).to.be.undefined;
    });

    //Testing for even
    it('should return correct result with an even length', function () {
        const expected = 'even'
        const actual = isOddOrEven('hahaha');
        expect(actual).to.equal(expected);
    });

    //Testing for odd
    it('should return correct result with an odd length', function () {
        const expected = 'odd'
        const actual = isOddOrEven('hah');
        expect(actual).to.equal(expected);
    });
});
