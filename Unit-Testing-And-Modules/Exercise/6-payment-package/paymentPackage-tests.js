const expect = require('chai').expect;
const PaymentPackage = require('./paymentPackage.js').PaymentPackage;

describe('PaymentPackage', function() {
    //Constructor Tests
    describe('constructor', function() {
        //Test the name
        it('should throw Error if name is invalid', () => {
            expect(() => new PaymentPackage([], 800)).to.throw(Error, 'Name must be a non-empty string');
            expect(() => new PaymentPackage('', 800)).to.throw(Error, 'Name must be a non-empty string');
        })
        //Test the value
        it('should throw Error if value is invalid', () => {
            expect(() => new PaymentPackage('Initial Meet', [5, 7, -3])).to.throw(Error, 'Value must be a non-negative number');
            expect(() => new PaymentPackage('Initial Meet', -100)).to.throw(Error, 'Value must be a non-negative number');
        })
    });

    //Name - Getter & Setters Tests
    describe('name', function() {
        //Testing the Getter
        it('get should return current name', () => {
            const paymentPackage = new PaymentPackage('Initial Meet', 800);
            const expected = 'Initial Meet';
            const actual = paymentPackage.name;
            expect(actual).to.be.eql(expected);
        });

        //Testing the Setter
        it('set should change name', () => {
            const paymentPackage = new PaymentPackage('Initial Offer', 1000);
            paymentPackage.name = 'Final Offer';

            const expected = 'Final Offer';
            const actual = paymentPackage.name;

            expect(actual).to.be.eql(expected);
        });

        it('set should throw Error when newValue is empty string', () => {
            const paymentPackage = new PaymentPackage('Initial Offer', 1000);
            expect(() => paymentPackage.name = '').to.throw(Error, 'Name must be a non-empty string');
        });

        it('set should throw Error when newValue is not of type string', () => {
            const paymentPackage = new PaymentPackage('Initial Offer', 1000);
            expect(() => paymentPackage.name = {}).to.throw(Error, 'Name must be a non-empty string');
        });

    });

    //Value - Getter & Setters Tests
    describe('value', function() {
        //Testing the Getter
        it('get should return current value', () => {
            const paymentPackage = new PaymentPackage('Initial Offer', 500);
            const expected = 500;
            const actual = paymentPackage.value;
            expect(actual).to.be.eql(expected);
        });

         //Testing the Setter
        it('set should change value', () => {
            const paymentPackage = new PaymentPackage('Initial Offer', 500);
            paymentPackage.value = 1000;

            const expected = 1000;
            const actual = paymentPackage.value;

            expect(actual).to.be.eql(expected);
        });

        it('set should throw Error when newValue is a negative number', () => {
            const paymentPackage = new PaymentPackage('Initial Offer', 1000);
            expect(() => paymentPackage.value = -500).to.throw(Error, 'Value must be a non-negative number');
        });

        it('set should throw Error when newValue is not of type number', () => {
            const paymentPackage = new PaymentPackage('Initial Offer', 1000);
            expect(() => paymentPackage.value = ['a', 'b', 'c']).to.throw(Error, 'Value must be a non-negative number');
        });      
    });

    //VAT - Getter & Setters Tests
    describe('VAT', function() {
        //Testing the Getter
        it('get should return default value', () => {
            const paymentPackage = new PaymentPackage('NET Price', 1000);
            const expected = 20;
            const actual = paymentPackage.VAT;
            expect(actual).to.be.eql(expected);
        });

        //Testing the Setter
        it('set should change value', () => {
            const paymentPackage = new PaymentPackage('NET Price', 1000);
            paymentPackage.VAT = 50;

            const expected = 50;
            const actual = paymentPackage.VAT;

            expect(actual).to.be.eql(expected);
        });

        it('set should throw Error when newValue is a negative number', () => {
            const paymentPackage = new PaymentPackage('NET Price', 1000);
            expect(() => paymentPackage.VAT = -20).to.throw(Error, 'VAT must be a non-negative number');
        });

        it('set should throw Error when newValue is not of type number', () => {
            const paymentPackage = new PaymentPackage('NET Price', 1000);
            expect(() => paymentPackage.VAT = 'foo').to.throw(Error, 'VAT must be a non-negative number');
        });
      
    });

    //Active - Getter & Setters Tests
    describe('active', function() {
        //Testing the Getter
        it('get should return default value', () => {
            const paymentPackage = new PaymentPackage('Financial Plan', 500);
            const expected = true;
            const actual = paymentPackage.active;
            expect(actual).to.be.eql(expected);
        });

        //Testing the Setter
        it('set should change value', () => {
            const paymentPackage = new PaymentPackage('Financial Plan', 500);
            paymentPackage.active = false;

            const expected = false;
            const actual = paymentPackage.active;

            expect(actual).to.be.eql(expected);
        });

        it('set should throw Error when newValue is not of type boolean', () => {
            const paymentPackage = new PaymentPackage('Financial Plan', 500);
            expect(() => paymentPackage.active = 199868).to.throw(Error, 'Active status must be a boolean');
        });
    });

    //toString Tests
    describe('toString', function() {
        it('should return correct output when active is true', () => {
            const paymentPackage = new PaymentPackage('Payment Package Plan', 1000);

            const expected = [
                `Package: ${paymentPackage.name}`,
                `- Value (excl. VAT): ${paymentPackage.value}`,
                `- Value (VAT ${paymentPackage.VAT}%): ${paymentPackage.value * (1 + paymentPackage.VAT / 100)}`
            ].join('\n');

            const actual = paymentPackage.toString();

            expect(actual).to.be.eql(expected);
        });

        it('should return correct output when active is false', () => {
            const paymentPackage = new PaymentPackage('Payment Package Plan', 1000);
            paymentPackage.active = false;

            const expected = [
                `Package: ${paymentPackage.name} (inactive)`,
                `- Value (excl. VAT): ${paymentPackage.value}`,
                `- Value (VAT ${paymentPackage.VAT}%): ${paymentPackage.value * (1 + paymentPackage.VAT / 100)}`
            ].join('\n');

            const actual = paymentPackage.toString();

            expect(actual).to.be.eql(expected);
        });
    });
});