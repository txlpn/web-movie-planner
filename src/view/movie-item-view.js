import { AbstractComponent } from '../framework/abstract-component.js'

export default class MovieItemView extends AbstractComponent {
	#movie
	#onDelete

	constructor(movie, { onDelete, onEdit }) {
		super()
		this.#movie = movie

		this.element
			.querySelector('.movie-delete-button')
			.addEventListener('click', () => onDelete(movie.id))

		this.element
			.querySelector('.movie-edit-button')
			.addEventListener('click', onEdit)
	}

	get template() {
		const { place, note } = this.#movie

		return `
            <li class="movie-item">
            <h3>${place}</h3>
            <p>${note}</p>
            <button class="movie-edit-button">Редактировать</button>
            <button class="movie-delete-button">Удалить</button>
            </li>
        `
	}

	#handleDelete = () => {
		this.#onDelete(this.#movie.id)
	}
}
