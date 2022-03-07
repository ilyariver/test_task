import { boldSearching } from './boldSearching'
import { templateSearchingItems } from '../templates/searchingItem'
import { getChoiceCity } from './choiceCity'

// Обработка кроссдоменных запросов
window.onload = function() {
	const inputSearch = document.querySelector('.js-search-input')
	const listSearching = document.querySelector('.js-search-list')

	inputSearch.addEventListener('input', function(e) {
		const inputValue = e.target.value
		const randomPostfix = Math.round(10_000 * Math.random())
		let callbackMethodName = `cb_${randomPostfix}`

		// Удалять список, если input пустой, чтобы не было видно стилей пустого тега UL
		inputValue ? listSearching.classList.add('active') : listSearching.classList.remove('active')

		window[callbackMethodName] = function(req) {
			try {
				const data = req.result
				const FIRST_ITEM = 0

				listSearching.innerHTML = ''

				data.map((city, i) => {
					// Удаление первого индекса (реклама API)
					if (i === FIRST_ITEM) return
					// Отправление найденных данных в HTML шаблон
					listSearching.insertAdjacentHTML('beforeend', templateSearchingItems(city))
					// Выделять совпадения жирным
					boldSearching(inputValue)
				})
				// Функция выбора города по клику
				getChoiceCity(data, inputSearch)
			} catch (e) {
				console.error(e)
			}
		}

		const script = document.createElement('script')
		script.id = `script_${callbackMethodName}`
		script.src = `https://kladr-api.ru/api.php?query=${
			inputValue || ''}&limit=10&contentType=city&callback=${callbackMethodName}`
		document.body.append(script)
		document.getElementById(script.id).remove()
	})

}
