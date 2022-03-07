// Функция выделения жирным шрифтом совпадений при вводе в input
export const boldSearching = inputValue => {
	const nameCity = document.querySelectorAll('.js-city')
	nameCity.forEach(city => {
		city.innerHTML =
			city.innerHTML.replace(new RegExp(inputValue,'g'),`<b>${inputValue}</b>`)
	})
}
