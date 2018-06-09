import 'mocha'
import chai from 'chai'
import debug from 'debug'
const expect = chai.expect,
			should = chai.should()
const d = debug('enumer8:test')
import Enum from '../src/Enumer8'

describe('Production', () => {

	describe('Basic string properties', () => {
		it('should contain the propterties "Prop1" to "Prop3"', () => {
			let BasicStrings = new Enum().case('Prop1','Prop2','Prop3')
			expect(BasicStrings).to.have.property('Prop1')
			expect(BasicStrings).to.have.property('Prop2')
			expect(BasicStrings).to.have.property('Prop3')
		})
	})

	describe('Raw string values', () => {
		it('should contain the properties "Dog": "Bear" and "Cat": "Annie"', () => {
			let RawStrings = new Enum('string').case({
				Dog: 'Bear',
				Cat: 'Annie'
			})
			expect(RawStrings).to.have.property('Dog').which.has.property('rawValue', 'Bear')
			expect(RawStrings).to.have.property('Cat').which.has.property('rawValue', 'Annie')
		})
	})

	describe('Case after freeze', () => {
		it('should throw an error when adding a case after freezing', () => {
			let FreezeEnum = new Enum().case('Prop1','Prop2')
			FreezeEnum.freeze()
			expect(() => FreezeEnum.case('Prop3')).to.throw()
		})
	})
	
	describe('Auto freeze', () => {
		it('should throw an error when adding a second case', () => {
			let FrozenEnum = new Enum({freeze: true}).case('Prop1', 'Prop2')
			expect(() => FreezeEnum.case('Prop3')).to.throw()
		})
	})

	describe('Auto Creating Raw Values', () => {
		it('should create a raw value with the items index', () => {
			let AutoRawVal = new Enum('number').case('Prop1', 'Prop2')
			expect(AutoRawVal.Prop1).to.have.property('rawValue', 1)
			expect(AutoRawVal.Prop2).to.have.property('rawValue', 2)
		})
	})

})

describe('README Examples', () => {

	describe('Type Configuration', () => {
		it('should throw typeerror', () => {
			let PetNames = new Enum('string')
			PetNames.case({
				Dog: 'Bolt',
				Cat: 'Simba',
				Mouse: 'Mickey'
			})
			expect(() => PetNames.case({Snake: true})).to.throw()
		})
	})

})
