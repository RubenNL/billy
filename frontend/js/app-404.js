/*Contributors: Nick*/

import {css, LitElement, html} from 'lit-element'

export class App404 extends LitElement {
	static get properties() {
		return {
			_detectiveImage: {type: String},
		}
	}

	constructor() {
		super()
		this._detectiveImage = {src: '/images/404.png'}
	}

	static get styles() {
		//language=CSS
		return css`
			:host {
				display: block;
				text-align: center;
				align-content: center;
			}

			:host > a > img {
				margin: 0 auto;
				display: block;
			}
		`
	}

	render() {
		//language=HTML
		return html`
			<img src="${this._detectiveImage.src}" alt="Error 404, de pagina kon niet gevonden worden" />
			<h1>Waarom probeer je het ondertussen niet opnieuw?</h1>
			<h2>Klik <a href="/">hier</a> om terug te gaan naar de hoofdpagina</h2>
		`
	}
}

customElements.define('app-404', App404)
