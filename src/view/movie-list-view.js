import { AbstractComponent } from '../framework/abstract-component.js'

export default class MovieListView extends AbstractComponent {
	get template() {
		return `<ul class="movie-list"></ul>`
	}

	get listElement() {
		return this.element
	}
}
