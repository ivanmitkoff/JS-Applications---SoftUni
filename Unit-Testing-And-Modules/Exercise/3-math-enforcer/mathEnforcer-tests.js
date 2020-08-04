const expect = require('chai').expect;
const mathEnforcer = require('./mathEnforcer.js').mathEnforcer;

//Testing the 'addFive' functionality
describe('mathEnforcer', () => {
    describe('addFive', () => {
        it('should return correct result with a positive number param', () => {
            const expected = 100;
            const actual = mathEnforcer.addFive(95);
            expect(actual).to.equal(expected);
        });

        it('should return correct result with a negative number param', () => {
            const expected = -11;
            const actual = mathEnforcer.addFive(-16);
            expect(actual).to.equal(expected);
        });

        it('should return undefined with a non-number param', () => {
            const actual = mathEnforcer.addFive('lorem ipsum...');
            expect(actual).to.be.undefined;
        });
    });

    //Testing the 'subtractTen' functionality
    describe('subtractTen', () => {
        it('should return correct result with a positive number param', () => {
            const expected = 8;
            const actual = mathEnforcer.subtractTen(18);
            expect(actual).to.equal(expected);
        });

        it('should return correct result with a negative number param', () => {
            const expected = -15;
            const actual = mathEnforcer.subtractTen(-5);
            expect(actual).to.equal(expected);
        });

        it('should return undefined with a non-number param', () => {
            const actual = mathEnforcer.subtractTen([{ name: "Pesho", age: 18 }, { company: "SoftUni", position: "CEO" }]);
            expect(actual).to.be.undefined;
        });


    });

    //Testing the 'sum' functionality
    describe('sum', () => {
        it('should return correct result with a positive number param', () => {
            const expected = 3.14;
            const actual = mathEnforcer.sum(3.14, 0);
            expect(actual).to.equal(expected);
        });

        it('should return correct result with a negative number param', () => {
            const expected = -200;
            const actual = mathEnforcer.sum(-100, -100);
            expect(actual).to.equal(expected);
        });

        it('should return undefined with both non-number params', () => {
            const actual = mathEnforcer.sum([1, 2, 3], 'Chai malko');
            expect(actual).to.be.undefined;
        });

        it('should return undefined with one non-number param and one number param', () => {
            const actual = mathEnforcer.sum(3.14, 'pi');
            expect(actual).to.be.undefined;
        });
    });
});