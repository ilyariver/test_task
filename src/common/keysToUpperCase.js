// преобразование ключей многомерного объекта в заглавные буквы
const recursion = object => {
	return Object.entries(object).reduce(
		(r, [key, value]) => {
			let temp = []
			r.forEach(s =>
				(Array.isArray(value) ? value : [value]).forEach(w =>
					(w && typeof w === 'object' ? recursion(w) : [w]).forEach(x =>
						temp.push(Object.assign({}, s, { [key.toUpperCase()]: x }))
					)
				)
			)
			return temp
		},
		[{}]
	)
}

export function converterKeysObj(data) {
	console.log(recursion(data)[0])
}
