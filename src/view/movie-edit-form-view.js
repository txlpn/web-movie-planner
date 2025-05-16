import { AbstractComponent } from '../framework/abstract-component.js'

export default class MovieEditFormView extends AbstractComponent {
	#movie
	#onSubmit

	constructor(movie, { onSubmit }) {
		super()
		this.#movie = movie
		this.#onSubmit = onSubmit
		this.element.addEventListener('submit', this.#handleSubmit)
	}

	get template() {
		const { place, date, note, status } = this.#movie

		return `
      <form class="movie-edit-form">
        <input type="text" name="place" value="${place}" required />
        <input type="date" name="date" value="${date}" required />
        <textarea name="note" rows="2">${note}</textarea>

        <select name="status">
          <option value="Planned" ${
			status === 'planned' ? 'selected' : ''
		}>Запланировано</option>
          <option value="Completed" ${
			status === 'completed' ? 'selected' : ''
		}>Завершено</option>
        </select>

        <button type="submit">Сохранить</button>
      </form>
    `
	}

	#handleSubmit = evt => {
		evt.preventDefault()
		const form = this.element

		const updatedMovie = {
			...this.#movie,
			place: form.place.value.trim(),
			date: form.date.value,
			note: form.note.value.trim(),
			status: form.status.value,
		}

		this.#onSubmit(updatedMovie)
	}
}
