/*Contributors: Ruben, Gianni, Daniel*/

import {css, LitElement, html} from 'lit-element'
import '@lrnwebcomponents/md-block/md-block.js'
import './app-404.js'
import 'fa-icons'
import {connect} from 'pwa-helpers/connect-mixin'
import store from '../redux'
import {toggle, isBookmarked} from '../redux/bookmarkStore.js'
export class appArtikel extends connect(store)(LitElement) {
	static get properties() {
		return {
			src: {type: String},
			_src: {type: String},
			_title: {type: String},
			_content: {type: String},
			location: Object,
			_404: {type: Boolean},
			_bookmarked: {type: Boolean},
			_lastEditedBy: {type: String},
			_categoryID: {type: String},
			_loggedIn: {type: Boolean},
			_functie: {type: String},
		}
	}
	constructor() {
		super()
		this._content = ''
		this._title = ''
		this._404 = false
		this._bookmarked = false
		this._lastEditedBy = ''
		this._loggedIn = false
		this._functie = ''
	}

	render() {
		//language=HTML
		if (this._404) return html`<app-404></app-404>`
		return html`<div id="meta">
				${this._loggedIn
					? html`
							${this._functie === 'student' ? html`` : html`${this.checkDeleted(this._categoryID)}`}
							<a tabindex="1" title="Voeg bladwijzer toe" @click="${this.bookmark}"> ${this._bookmarked ? html`<fa-icon class="fas fa-bookmark" path-prefix="/node_modules" />` : html`<fa-icon class="far fa-bookmark" path-prefix="/node_modules" />`}</a>
					  `
					: html``}
				<br />
				<span id="lastEditedBy">Laatst bewerkt door ${this._lastEditedBy}</span>
			</div>
			<h1>${this._title}</h1>
			${this._content ? html`<md-block markdown="${this._content}"></md-block>` : html``}`
	}

	checkDeleted(id) {
		if (id !== 1688148667) {
			return html` <a tabindex="3" id="trashcan" @click="${this.delete}" title="Artikel verwijderen"><fa-icon class="fas fa-trash-alt" path-prefix="/node_modules" /></a>
				<a tabindex="2" href="/creator/${this.src}" title="Artikel bewerken"><fa-icon class="fas fa-pencil-alt" path-prefix="/node_modules" /></a>`
		} else {
			return html` <a tabindex="2" href="/creator/${this.src}" title="Artikel bewerken"><fa-icon class="fas fa-pencil-alt" path-prefix="/node_modules" /></a>`
		}
	}

	stateChanged(state) {
		this._loggedIn = !!state.userStore.jwt
		this._functie = state.userStore.functie
		if (!state.bookmarkStore) return
		this._bookmarked = isBookmarked(this._src)
	}

	bookmark() {
		store.dispatch(toggle(this._src))
	}
	delete() {
		if (!confirm('Weet u zeker dat u dit artikel wilt verwijderen?')) return
		const data = {
			categoryId: 1688148667,
		}
		sendAuthenticated('/api/saveArticle/' + this._src, data).then(() => window.dispatchEvent(new CustomEvent('vaadin-router-go', {detail: {pathname: '/'}})))
	}
	onBeforeEnter(location) {
		this.src = location.params.article
	}

	static get styles() {
		//language=CSS
		return css`
			:host {
				color: var(--text-color);
			}
			#meta {
				float: right;
			}
			a {
				margin: auto;
				margin-right: 40px;
				font-size: 30px;
				text-decoration: inherit;
				float: right;
			}

			fa-icon:focus,
			a:focus {
				outline: none;
			}
			fa-icon {
				color: #808080;
				width: 1em;
				height: 1em;
				padding: 0 3px;
				cursor: pointer;
			}

			.trashcanview {
				display: none;
			}

			fa-icon:hover {
				transform: scale(1.3);
			}
			#lastEditedBy {
				clear: both;
				white-space: nowrap;
			}
		`
	}

	set src(val) {
		this._src = val
		fetch(`/api/article/${val}`)
			.then(response => response.json())
			.then(response => {
				this._404 = !response
				this._content = response.data
				this._title = response.title
				this._lastEditedBy = response.lastEditedBy
				this._categoryID = response.categoryId
			})
			.catch(() => {
				this._404 = true
				this._content = ''
				this._title = ''
				this._lastEditedBy = ''
			})
	}
	get src() {
		return this._src
	}
}
customElements.define('app-artikel', appArtikel)
