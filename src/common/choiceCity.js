// Показ результата в поле "город" по клику
export const getChoiceCity = (data, inputSearch) => {
	const nameCity = document.querySelectorAll('.js-search-item')
	const nameLocalityField = document.querySelector('.js-searching-locality-field')
	const nameLocationField = document.querySelector('.js-searching-location-field')

	nameCity.forEach(city => {
		city.addEventListener('click', e => {
			const target = e.target.closest('.js-search-item')

			if (target) {
				const pushedCity = target.dataset.city
				const choiceCity = data.filter(city => city.name === pushedCity)[0]

				inputSearch.value = choiceCity.name
				nameLocalityField.innerHTML = choiceCity.type + ':'
				nameLocationField.innerHTML = choiceCity.name
			}
		})
	})
}
