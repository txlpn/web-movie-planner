import MovieItemView from '../view/movie-item-view.js'
import MovieListView from '../view/movie-list-view.js'
import MovieFormView from '../view/movie-form-view.js'
import MovieFilterView from '../view/movie-filter-view.js'
import { render } from '../framework/render.js'
import MovieEditFormView from '../view/movie-edit-form-view.js'

export default class MoviePresenter {
	#movieModel
	#container
	#movieListComponent

	constructor({ container, movieModel: movieModel }) {
		this.#movieModel = movieModel
		this.#container = container
	}

	init() {
		const formComponent = new MovieFormView({
			onSubmit: movie => {
				this.#movieModel.addMovie(movie)
				this.#renderMovies()
			},
		})
		render(formComponent, document.querySelector('.movie-form'))

		const filterComponent = new MovieFilterView({
			onFilterChange: filterData => {
				this.#movieModel.setFilter(filterData)
				this.#renderMovies()
			},
		})
		render(filterComponent, document.querySelector('.movie-filter'))

		this.#movieListComponent = new MovieListView()
		render(this.#movieListComponent, this.#container)

		this.#renderMovies()
	}

	#renderMovies() {
		this.#movieListComponent.listElement.innerHTML = ''

		this.#movieModel.getFilteredMovies().forEach(movie => {
			const movieView = new MovieItemView(movie, {
				onDelete: id => {
					this.#movieModel.deleteMovie(id)
					this.#renderMovies()
				},
				onEdit: () => {
					const editForm = new MovieEditFormView(movie, {
						onSubmit: updatedMovie => {
							this.#movieModel.updateMovie(updatedMovie)
							this.#renderMovies()
						},
					})

					this.#movieListComponent.listElement.replaceChild(
						editForm.element,
						movieView.element
					)
				},
			})

			render(movieView, this.#movieListComponent.listElement)
		})
	}
}