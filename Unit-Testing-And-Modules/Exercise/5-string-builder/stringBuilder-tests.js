const expect = require('chai').expect;
const StringBuilder = require('./stringBuilder.js').StringBuilder;

describe('StringBuilder', function() {
    //Constructor Tests
    describe('constructor', () => {
        //Test with a number
        it('should throw TypeErrorException when the param is not a string', () => {
            expect(() => new StringBuilder(666)).to.throw(TypeError, 'Argument must be string');
        });

        //Test without params
        it('should not throw TypeErrorException when instantiated without param', () => {
            expect(() => new StringBuilder()).to.not.throw(TypeError);
        });

        //Test with a string
        it('should not throw TypeErrorException when the param is a string', () => {
            expect(() => new StringBuilder('foo bar')).to.not.throw(TypeError);
        });
    });

    //Append Tests
    describe('append', function() {
        it('should throw TypeErrorException when the param is not a string', () => {
            const sb = new StringBuilder();
            expect(() => sb.append(73)).to.throw(TypeError, 'Argument must be string');
        });

        it('should add string to the end of the storage', () => {
            const sb = new StringBuilder('Lorem ipsum ');
            sb.append('dolor sit amet...');

            const actual = sb._stringArray;
            const expected = Array.from('Lorem ipsum dolor sit amet...');

            expect(actual).to.be.eql(expected);
        });
    });

    //Prepend Tests
    describe('prepend', function() {
        it('should throw TypeErrorException when the param is not a string', () => {
            const sb = new StringBuilder();
            expect(() => sb.prepend(['this', 'is', 'a', 'array', 'string'])).to.throw(TypeError, 
                'Argument must be string');
        });

        it('should add string to the beginning of the string', () => {
            const sb = new StringBuilder('Uni');
            sb.prepend('Soft');

            const actual = sb._stringArray;
            const expected = Array.from('SoftUni');

            expect(actual).to.be.eql(expected);
        });
    });

    //InsertAt Tests
    describe('insertAt', function() {
        it('should throw TypeErrorException when the param is not a string', () => {
            const sb = new StringBuilder();
            expect(() => sb.insertAt({}, 4)).to.throw(TypeError, 'Argument must be string');
        });

        it('should add string at the given index', () => {
            const sb = new StringBuilder('Pe');
            sb.insertAt('sho', 3);

            const actual = sb._stringArray;
            const expected = Array.from('Pesho');

            expect(actual).to.be.eql(expected);
        });
    });

    //Remove Tests
    describe('remove', function() {
        it('should remove elements from the string', () => {
            const sb = new StringBuilder('Java');
            sb.remove(0, 2);

            const actual = sb._stringArray;
            const expected = ['v', 'a'];

            expect(actual).to.be.eql(expected);
        });

        it('should remove all elements from the string', () => {
            const sb = new StringBuilder('java');
            sb.remove(0, 4);

            const actual = sb._stringArray;
            const expected = [];

            expect(actual).to.be.eql(expected);
        });
    });

    //toString Tests
    describe('toString', function() {
        it('should return a string with all elements joined by an empty string', () => {
            const sb = new StringBuilder('Java');
            sb.append('Script');
            sb.append(' Soft');
            sb.append('Uni');

            const actual = sb.toString();
            const expected = 'JavaScript SoftUni';

            expect(actual).to.be.eql(expected);
        });
    });
});