/*Contributors: Daniel, Ruben*/

import {css, LitElement, html} from 'lit-element'
import './app-404.js'
import './app-article-card.js'
export class appCategoryPage extends LitElement {
	static get properties() {
		return {
			_id: {type: String},
			_articles: {type: Array},
			location: Object,
			src: {type: Number},
			_subcategoryName: {type: String},
			_headcategoryName: {type: String},
			_404: {type: Boolean},
		}
	}

	constructor() {
		super()
		this._articles = []
		this._404 = false
	}

	render() {
		//language=HTML;
		if (this._404) return html`<app-404></app-404>`
		return html`<h2>${this._headcategoryName}</h2>
			<h3>${this._subcategoryName}</h3>
			<div class="articlecontainer">${this._articles.map(id => html`<app-article-card id="${id}"></app-article-card>`)}</div>`
	}

	static get styles() {
		// language=css
		return css`
			.articlecontainer {
				display: grid;
				grid-template-columns: 1fr 1fr 1fr;
			}
		`
	}

	onBeforeEnter(location) {
		this.src = location.params.categoryID
		fetch(`/api/getCategory/${location.params.categoryID}`)
			.then(response => response.json())
			.then(response => {
				this._404 = !response
				this._subcategoryName = response.name
				this._headcategoryName = response.headcatagory
			})
	}

	set src(val) {
		fetch(`/api/getArticlesByCategory/${val}`)
			.then(response => response.json())
			.then(response => {
				this._articles = response
			})
	}
}

customElements.define('app-category-page', appCategoryPage)
