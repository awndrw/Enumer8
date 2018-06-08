import assign from 'lodash.assign'
import makeCase from './makeCase'
import VerifyCases from './util/VerifyCases'

const CONFIG = Symbol('CONFIG'),
			CASES = Symbol('CASES'),
			FROZEN = Symbol('FROZEN')


/**
 * @const {Config} Default Enum Configuration
 * @private
 */
const DEFAULTS = {
	type: false,
	freeze: false,
	ignoreCase: false
}

/**
 * Enumeration Class
 * @class Enum
 */
export default class Enum {
	/**
	 * Creates an instance of Enum.
	 * @param {Config|RawTypes} [config={}]
	 * @memberof Enum
	 */
	constructor(config = {}) {
		switch (typeof config) {
			case 'object':
				this[CONFIG] = assign({}, DEFAULTS, config)
				break

			case 'string':
				this[CONFIG] = assign({}, DEFAULTS, {type: config})
				break

			default: throw new Error('Unknown configuration recieved')
		}
		return this
	}

	/**
	 * Enumerates the case(s) passed into the function
	 * @param {...caseTypes} Case A string, array of strings, or object to enumerate
	 * @return {Enum}
	 */
	case (...Case) {
		if (this[FROZEN]) throw new Error('Cases cannot be added after the enumeration is frozen.')

		let {cases, type} = VerifyCases(Case)

		if (typeof cases !== 'object') throw new Error('UNKNOWN TYPE?')

		switch (type) {
			case 'array':
				if (this[CONFIG.type] !== false) throw new Error('Type cannot be enforced when raw values are not present')
				else {
					this[CONFIG].type = 'string'
					cases.forEach(c => this.pushCase(c))
				}
				break

			case 'object':
				if (!this[CONFIG].type) throw new Error('Type must be configured to use enumeration cases with raw values')
				Object.keys(cases).forEach(c => this.pushCase(c, cases[c]))
				break

			default:
				throw new Error('UNKNOWN TYPE?')
		}

		if (this[CONFIG].freeze) this[FROZEN] = true

		return this
	}

	/**
	 * Returns the enumerated property with a specified value
	 * @param {*} value The value to find in the enumeration
	 * @returns {EnumCase}
	 */
	findVal(value) { return this.cases.find(c => c.rawValue === value) }

	/** Freezes the enumeration */
	freeze() { this[FROZEN] = true }

	/**
	 * Returns whether or not the enumeration is frozen
	 * @returns {boolean}
	 */
	isFrozen() { return this[FROZEN] }

	/**
	 * Get all enumerated values
	 * @return {Array}
	 */
	get cases() {
		this[CASES] = this[CASES] || []
		return this[CASES]
	}

	/** Allows for the iteration of cases */
	[Symbol.iterator] = () => this.cases[Symbol.iterator]()


	/**
	 * Pushes enumeration to store
	 * @param {string} id ID for the enumeration pair
	 * @param {*} [rawValue] Optional raw value
	 * @private
	 */
	pushCase = (id, rawValue) => {
		const newCase = makeCase(id, rawValue, this[CONFIG].type, this.cases.length)
		this[id] = newCase
		this.cases[id] = this[CONFIG].type ? newCase : id
	}

}
