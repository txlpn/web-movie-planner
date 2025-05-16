import MoviePresenter from './presenter/movie-presenter.js'
import MovieModel from './model/movie-model.js'

const appContainer = document.querySelector('.movie-list')
const movieModel = new MovieModel()

const presenter = new MoviePresenter({
	container: appContainer,
	movieModel: movieModel,
})

presenter.init()