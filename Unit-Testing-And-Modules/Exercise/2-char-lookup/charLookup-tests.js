const expect = require('chai').expect;
const charLookup = require('./charLookup.js').lookupChar;

describe('lookupChar', function () {
    //Test if first parameter is a string
    it('should return undefined if first parameter is a number', function () {
        const actual = charLookup(-42, 0);
        expect(actual).to.be.undefined;
    });

    //Test if first parameter is a string
    it('should return undefined if first parameter is an object', function () {
        const actual = charLookup({ string: 666 }, 3);
        expect(actual).to.be.undefined;
    });

    //Test if second parameter is a number
    it('should return undefined if second parameter is a string', function () {
        const actual = charLookup('random text', 'I love Java!');
        expect(actual).to.be.undefined;
    });

    //Test if second parameter is an integer
    it('should return undefined if second parameter is a floating point', function () {
        const actual = charLookup('random text', 5.89);
        expect(actual).to.be.undefined;
    });

    //Test if second parameter is a number
    it('should return undefined if second parameter is an object', function () {
        const actual = charLookup('random text', { language: 'Java' });
        expect(actual).to.be.undefined;
    });

    //Test if both parameters are the correct type
    it('should return undefined when both parameters are not in correct type', function () {
        const actual = charLookup(345, [2, 4, 6]);
        expect(actual).to.be.undefined;
    });

    //Test if the index is bigger than the string length
    it('should return \'Incorrect index\' when the value of the index is bigger than the string length',
        function () {
            const expected = 'Incorrect index';
            const actual = charLookup('aaa', 5);
            expect(actual).to.equal(expected);
        });

    //Test if the index is equal to the string length
    it('should return \'Incorrect index\' when the value of the index is bigger than the string length',
        function () {
            const expected = 'Incorrect index';
            const actual = charLookup('aaa', 3);
            expect(actual).to.equal(expected);
        });

    //Test if the index is a negative number
    it('should return \'Incorrect index\' when the value of the index is bigger than the string length', 
    function () {
        const expected = 'Incorrect index';
        const actual = charLookup('aaa', -1);
        expect(actual).to.equal(expected);
    });

    //Test if parameters are passed correctly, the function returns correct result
    it('should return character at the specified index when both parameters have correct types and values', function () {
        const expected = 'v';
        const actual = charLookup('Java', 2);
        expect(actual).to.equal(expected);
    });
});