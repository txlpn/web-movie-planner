import { movies as mockMovie } from '../mock/movies.js'

export default class MovieModel {
	#movies = [...mockMovie]
	#filter = { status: '' }

	get movies() {
		return this.#movies
	}

	setFilter({ status }) {
		this.#filter = { status }
	}

	getFilteredMovies() {
		return this.#movies.filter(movie => {
			const matchStatus = this.#filter.status
				? movie.status === this.#filter.status
				: true

			return matchStatus
		})
	}

	addMovie(movie) {
		this.#movies.push(movie)
	}

	deleteMovie(id) {
		this.#movies = this.#movies.filter(movie => movie.id !== id)
	}

	updateMovie(updatedMovie) {
		this.#movies = this.#movies.map(movie =>
			movie.id === updatedMovie.id ? updatedMovie : movie
		)
	}
}