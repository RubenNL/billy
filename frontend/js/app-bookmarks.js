/*Contributors: Ruben */

import {css, LitElement, html} from 'lit-element'
import {connect} from 'pwa-helpers/connect-mixin.js'
import store from '../redux/index.js'
import './app-article-card.js'
export class AppBookmarks extends connect(store)(LitElement) {
	static get properties() {
		return {
			_articles: {type: Array},
			location: {type: Object},
		}
	}
	constructor() {
		super()
		this._articles = []
	}
	stateChanged(state) {
		if (!state.userStore.jwt) window.dispatchEvent(new CustomEvent('vaadin-router-go', {detail: {pathname: '/login'}}))
		else this._articles = state.bookmarkStore
	}

	render() {
		//language=HTML;
		return html`<h2>Bladwijzers</h2>
			<div class="articlecontainer">${this._articles.length > 0 ? this._articles.map(id => html`<app-article-card id="${id}" />`) : html`U heeft nog geen artikelen opgeslagen.`}</div>`
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
}

customElements.define('app-bookmarks', AppBookmarks)
