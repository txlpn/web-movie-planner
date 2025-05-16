import { AbstractComponent } from '../framework/abstract-component.js'

export default class MovieFormView extends AbstractComponent {
	#onSubmit

	constructor({ onSubmit }) {
		super()
		this.#onSubmit = onSubmit

		this.element
			.querySelector('form')
			.addEventListener('submit', this.#handleSubmit)
	}

	get template() {
		return `
      <div class="movie-form">
        <h2>Добавить новый фильм</h2>
        <form id="movie-form">
          <label for="movie-description">Название:</label>
          <input type="text" id="movie-description" placeholder="Description" required />

          <label for="movie-notes">Описание:</label>
          <textarea id="movie-notes" placeholder="Notes" rows="3"></textarea>

          <fieldset>
            <legend>Статус фильма:</legend>
            <label><input type="radio" name="movie-status" value="Planned" required /> Хочу посмотреть</label>
            <label><input type="radio" name="movie-status" value="Completed" required /> Просмотрено</label>
          </fieldset>

          <button type="submit">Добавить фильм</button>
        </form>
      </div>
    `
	}

	#handleSubmit = evt => {
		evt.preventDefault()

		const form = this.element.querySelector('form')

		const movie = {
			id: crypto.randomUUID(),
			place: form.querySelector('#movie-description').value.trim(),
			note: form.querySelector('#movie-notes').value.trim(),
			status: form.querySelector('input[name="movie-status"]:checked').value,
		}

		this.#onSubmit(movie)
		form.reset()
	}
}
