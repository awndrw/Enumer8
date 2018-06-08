const types = [
	'string',
	'number',
	'boolean'
]

const VerifyCases = (caseArray) => {

	let cases, type
	switch (typeof caseArray[0]) {
		case 'string':
		case 'number':
		case 'boolean':
			if (caseArray.forEach(c => types.includes(typeof c))) throw new Error('Enumer8 currently only supports string, number, and boolean values')
			cases = caseArray
			type = 'array'
			break

		case 'object':
			if (caseArray.length > 1) throw new Error('Individual values cannot be enumerated if an object/array is present')
			if (Array.isArray(caseArray[0])) {
				cases = VerifyCases(caseArray[0]).cases
				type = VerifyCases(caseArray[0]).type
			} else {
				cases = caseArray[0]
				type = 'object'
			}
			break

		default:
			throw new Error('Enumer8 currently only supports string, number, and boolean values')
	}

	return {
		cases,
		type
	}

}

export default VerifyCases
