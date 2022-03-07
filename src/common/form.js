// Логика работы формы и ее частей
(function() {
	const input = document.querySelector('.js-search-input')
	const inputTitle = document.querySelector('.js-input-title')
	const searchContent = document.querySelector('.js-search-content')
	const listSearching = document.querySelector('.js-search-list')

	// Анимация плейсхолдера инпута
	function animateLabelTitleActivate() {
		input.classList.add('active')
		inputTitle.classList.add('active')
		searchContent.classList.add('active')
	}

	// Анимация плейсхолдера инпута и выпадающего списка совпадений
	function animateLabelTitleDeactivate() {
		input.classList.remove('active')
		searchContent.classList.remove('active')
		listSearching.classList.remove('active')
	}

	// Слушатель событий фокуса инпута
	input.addEventListener('focus', animateLabelTitleActivate)
	input.addEventListener('blur', function(e) {
		animateLabelTitleDeactivate()
		const clearList = setTimeout(() => listSearching.innerHTML = '', 100)

		if (e.target.value !== '') return
		inputTitle.classList.remove('active')
		clearInterval(clearList)
	})
})()
