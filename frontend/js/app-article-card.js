/*Contributors: Ruben, Marlon*/

import {css, LitElement, html} from 'lit-element'
import {connect} from 'pwa-helpers/connect-mixin.js'
import store from '../redux/index.js'
import {toggle, isBookmarked} from '../redux/bookmarkStore.js'
import 'fa-icons'
export class AppArticleCard extends connect(store)(LitElement) {
	static get properties() {
		return {
			id: {type: String},
			title: {type: String},
			preview: {type: String},
			_bookmarked: {type: Boolean},
			_loggedIn: {type: Boolean},
		}
	}

	constructor() {
		super()
		this.title = ''
		this.preview = ''
		this._bookmarked = false
		this._loggedIn = false
	}
	stateChanged(state) {
		this._loggedIn = !!state.userStore.jwt
		if (!state.bookmarkStore) return
		this._bookmarked = isBookmarked(this.id)
	}

	firstUpdated() {
		this.id = '' + this.id
		fetch(`/api/getArticlePreview/${this.id}`)
			.then(response => response.json())
			.then(article => {
				this.title = article.title
				this.preview = article.preview
			})
	}

	static get styles() {
		//language=CSS
		return css`
			:host {
				background-color: var(--bg-block);
				width: auto;
				height: auto;
				box-sizing: border-box;
				box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
				margin: 0 36px 36px 0;
				align-items: center;
				border-radius: 3px;
				transition: all 0.1s ease-in-out;
			}
			a {
				text-decoration: none;
				padding: 15px;
				display: block;
			}

			:host(:hover) {
				-webkit-font-smoothing: subpixel-antialiased;
				transform: translate3d(0%, 0%, 0) scale(1.02, 1.02);
				box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
			}

			.article > h4 {
				margin-top: 0px;
				margin-bottom: 10px;
			}

			.article > p {
				margin: 0;
				font-size: 13px;
			}

			.article > * {
				text-align: left;
				color: var(--text-color);
			}
			#toggleBookmark {
				float: right;
			}
			#toggleBookmark:focus {
				outline: none;
			}
		`
	}

	render() {
		//language=HTML
		return html`
			<a class="article" router-link href="/article/${this.id}">
				${this._loggedIn ? html` <a id="toggleBookmark" tabindex="0" title="toggle bookmark" @click="${this.bookmark}">${this._bookmarked ? html`<fa-icon class="fas fa-bookmark" path-prefix="/node_modules" />` : html`<fa-icon class="far fa-bookmark" path-prefix="/node_modules" />`}</a>` : html``}
				<h4>${this.title}</h4>
				<p>${this.preview}</p>
			</a>
		`
	}
	bookmark(e) {
		e.preventDefault()
		store.dispatch(toggle(this.id))
	}
}
customElements.define('app-article-card', AppArticleCard)
