/*Contributors: Ruben, Daniel */

import {css, LitElement, html} from 'lit-element'

export class AppSearch extends LitElement {
	static get properties() {
		return {
			_value: {type: String},
			_suggestions: {type: Array},
		}
	}

	constructor() {
		super()
		this._suggestions = []
		this._value = ''
	}

	static get styles() {
		//language=css
		return css`
			#links {
				grid-column: 2;
				display: none;
				border-radius: 5px;
				background-color: white;
				position: relative;
				z-index: 1;
				padding: 5px;
				margin-top: 5px;
				padding-left: 10px;
				box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
				transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
			}

			input:focus + #links,
			:host(:hover) > #links {
				display: block;
			}

			:host {
				display: grid;
				grid-template-columns: 10% 90%;
				width: 250px;
			}

			input {
				background: #ddd;
				grid-column: 2;
				height: 100%;
				padding: 0 0 0 6px;
				border-style: solid;
				border-width: 1px;
				border-radius: 0 4px 4px 0;
				border-left: none;
			}

			fa-icon {
				border-right: none;
				text-align: center;
				height: 100%;
				grid-column: 1;
				background: #ddd;
				font-size: 17px;
				border-radius: 4px 0 0 4px;
				display: inline-grid;
				justify-content: center;
				align-items: center;
				border-style: solid;
				border-width: 1px;
				border-color: gray;
			}
		`
	}

	render() {
		return html`
			<fa-icon class="fas fa-search" path-prefix="/node_modules"></fa-icon>
			<input aria-label="Zoeken:" autocomplete="off" type="text" id="search" @input="${this._onchange}" />
			<div id="links">${this._suggestions.length > 0 ? this._suggestions.map(suggestion => html`<a router-link href="/article/${suggestion.id}">${suggestion.title}</a> <br />`) : html`Geen zoekresultaten`}</div>
		`
	}

	_onchange(e) {
		this._value = e.target.value
		const query = this._value
		fetch(`/api/search?${query}`)
			.then(response => response.json())
			.then(items => {
				this._suggestions = items
			})
	}

	_openArticle(id) {
		return () => {
			document.querySelector('app-content').state = 'article'
			document.querySelector('app-content').page = id
		}
	}
}

customElements.define('app-search', AppSearch)
