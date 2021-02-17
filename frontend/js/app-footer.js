/*Contributors: Nick, Marlon*/

import {css, LitElement, html} from 'lit-element'

export class appFooter extends LitElement {
	static get properties() {
		return {
			_hboiLink: {
				type: String,
			},
			_githubImage: {
				type: String,
			},
			_githubLink: {
				type: String,
			},
			_huLink: {
				type: String,
			},
			_avansLink: {
				type: String,
			},
			_copyrightText: {
				type: String,
			},
		}
	}
	static get styles() {
		//language=CSS
		return css`
			:host {
				height: 150px;
				background-color: var(--bg-block);
				padding: 10px;
				display: block;
				border-radius: 5px;
				box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
				text-align: center;
				align-content: center;
			}
			:host > a:nth-child(1) {
				width: 50px;
				margin: 0 auto;
				display: block;
			}
			:host > a > img {
				margin: 0 auto;
				display: block;
			}
		`
	}
	constructor() {
		super()
		this._avansLink = {src: 'https://www.avans.nl/'}
		this._hboiLink = {src: 'https://www.hbo-i.nl/'}
		this._githubImage = {src: '/images/github_50px.webp'}
		this._githubLink = {src: 'https://github.com/HU-SD-SV2PRFED-studenten-2021/prfed_2021-v2b-v'}
		this._huLink = {src: 'https://hu/nl'}
		this._copyrightText = '© 2020 - Team V2B-5'
	}

	render() {
		return html`
			<a href="${this._githubLink.src}"><img src="${this._githubImage.src}" alt="githubImage" width="50" height="50" class="align-content-center" /></a>
			<a href="${this._avansLink.src}">Avans</a>
			<a href="${this._huLink.src}">Hogeschool Utrecht</a>
			<a href="${this._hboiLink.src}">HBO-I</a>
			<p>${this._copyrightText}</p>
		`
	}
}

customElements.define('app-footer', appFooter)
