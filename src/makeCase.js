export default function makeCase(id, val, type, index) {
	let rawValue
	if (typeof val === 'undefined') rawValue = typeResolve(type, id, index)
	else if (typeof val !== type) throw new TypeError(`Raw value must conform to the specified type.\nRaw value: ${typeof rv}, Expected: ${type}`)
	else rawValue = val

	return { id, rawValue }
}

function typeResolve(type, id, index) {
	switch (type) {
		case 'string': return id
		case 'number': return index
		case 'boolean': return true
		default: throw new Error('The provided type was not found!')
	}
}

/*
export default class EnumCase {

	constructor(id, rawValue, type) {
		this.id = id
		if (typeof rawValue !== type) throw new Error()
		this.rawValue = rawValue || this.typeResolve(type)
		return this
	}

	typeResolve(type) {
		switch (type) {
			case 'string': return this.id
			case 'number': return this.cases.length
			case 'boolean': return true
			case 'function': return function () { return this.id }
			default: throw new Error('The provided type was not found!')
		}
	}

}
 */
