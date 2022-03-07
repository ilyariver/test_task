// Шаблон item списка найденных совпадений
export const templateSearchingItems = ({type, name}) => `
	<li class="search-content__item js-search-item" data-city="${name}">
    <span class="search-content__locality">${type}</span>
    <span class="search-content__location js-city">${name}</span>
  </li>
`
