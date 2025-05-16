import { AbstractComponent } from '../framework/abstract-component.js'

export default class MovieFilterView extends AbstractComponent {
	#onFilterChange

	constructor({ onFilterChange }) {
		super()
		this.#onFilterChange = onFilterChange

		this.element
			.querySelector('#status-filter')
			.addEventListener('change', this.#handleFilterChange)
	}

	get template() {
		return `
      <div class="movie-filter">
        <label for="status-filter">Фильтр по статусу:</label>
        <select id="status-filter">
          <option value="">Все</option>
          <option value="planned">Хочу посмотреть</option>
          <option value="completed">Просмотрено</option>
        </select>
      </div>
    `
	}

	#handleFilterChange = () => {
		const statusValue = this.element.querySelector('#status-filter').value

		this.#onFilterChange({
			status: statusValue,
		})
	}
}
