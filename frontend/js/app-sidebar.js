/*Contributors: Marlon, Daniel, Ruben, Gianni, Nick */

import {LitElement, html, css} from 'lit-element'
import store from '../redux/index.js'
import {connect} from 'pwa-helpers/connect-mixin.js'

export class appSidebar extends connect(store)(LitElement) {
	static get properties() {
		return {
			_categories: {type: Array},
			_functie: {type: String},
		}
	}

	stateChanged(state) {
		this._functie = state.userStore.functie
	}

	constructor() {
		super()
		this._categories = []
		fetch(`/api/getCategories`)
			.then(response => response.json())
			.then(response => {
				this._categories = response
			})
		this.classList.add('bg-container')
	}

	static get styles() {
		// language=css
		return css`
			:host {
				min-height: 100%;
				color: var(--text-color);
			}

			#side-nav {
				list-style-type: none;
				padding-left: 0px;
				color: var(--text-color);
			}
			#side-nav-sub > a {
				text-decoration: none;
				color: var(--text-color);
				padding-bottom: 10px;
			}
			.side-nav-sub {
				padding-left: 0px;
				list-style-position: inside;
				list-style-type: none;
				margin-bottom: 15px;
			}

			.head-item {
				font-size: 16px;
				font-weight: bold;
				margin-top: 0px;
				margin-bottom: 5px;
			}

			.sub-item > a {
				display: block;
				padding: 3px 5px;
				border-radius: 3px;
			}
			.sub-item > * {
				text-decoration: none;
				list-style-type: square;
				font-size: 13px;
				color: var(--text-color);
			}
			.sub-item a:hover {
				background-color: var(--menu-hover);
			}
		`
	}

	determineAcces() {
		switch (this._functie) {
			case 'student':
				return html` <app-button width="100%" margin="0 0 3px 0" router-link href="/bookmarks#main">Bladwijzers</app-button>`
			case 'auteur':
				return html` <app-button width="100%" margin="0 0 3px 0" router-link href="/bookmarks#main">Bladwijzers</app-button>
					<app-button width="100%" margin="0 0 3px 0" router-link href="/creator#main">Nieuw artikel</app-button>`
			case 'admin':
				return html` <app-button width="100%" margin="0 0 3px 0" router-link href="/bookmarks" class="button" id="menuButton">Bladwijzers</app-button>
					<app-button width="100%" margin="0 0 3px 0" router-link href="/creator" class="button" id="menuButton">Nieuw artikel</app-button>
					<app-button width="100%" margin="0 0 3px 0" router-link href="/users" class="button">Gebruikers beheren</app-button>
					<app-button width="100%" margin="0 0 3px 0" router-link href="/editCategory" class="button">Categorieën beheren</app-button>`
		}
	}

	render() {
		return html`
			<link rel="stylesheet" href="/bundle.css" />
			<h2>Menu</h2>
			<nav>
				${this._functie ? this.determineAcces() : html``}
				<ul id="side-nav">
					${this._categories.map(
						hoofdcat => html`
							<li>
								<h3 class="head-item">${hoofdcat.headcatagory} (${hoofdcat.count})</h3>
								<ul class="side-nav-sub">
									${hoofdcat.subcatagories.map(sub => html` <li class="sub-item"><a router-link href="/category/${sub.id}#main">${sub.title} (${sub.count})</a></li>`)}
								</ul>
							</li>
						`
					)}
				</ul>
			</nav>
		`
	}
}

customElements.define('app-sidebar', appSidebar)
