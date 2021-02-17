/*Contributors: Daniel, Marlon, Ruben, Nick, Gianni*/

import './app-search.js'
import {css, html, LitElement} from 'lit-element'
import {connect} from 'pwa-helpers/connect-mixin.js'
import {toggleDarkMode} from '../redux/userStore.js'
import store from '../redux/index.js'
import {set} from 'redux/bookmarkStore.js'

class AppHeader extends connect(store)(LitElement) {
	static get properties() {
		return {
			_userName: {type: String},
		}
	}

	constructor() {
		super()
		this._userName = ''
		this.classList.add('bg-container')
	}
	stateChanged(state) {
		this._userName = state.userStore.fullName
		if (this._oldJwt != state.userStore.jwt && state.userStore.jwt)
			window.sendAuthenticated('/api/getBookmarks').then(bookmarks => {
				store.dispatch(set(bookmarks))
			})
		this._oldJwt = state.userStore.jwt
		document.querySelector('html').classList.remove('darkMode')
		if (state.userStore.darkMode) document.querySelector('html').classList.add('darkMode')
	}
	render() {
		//language=HTML
		return html` <a router-link href="/" aria-label="Homepage">
				<img src="/images/logo_100px.webp" alt="" width="100px" height="100px" />
				<div class="logo-title">
					<h1>Open ICT - Billy 2.0</h1>
					<h2>De wiki voor en door HBO-ICT studenten.</h2>
				</div>
			</a>
			<div class="search-container">
				${this._userName
					? //wel ingelogd
					  html`<span id="greet">Welkom ${this._userName}! <fa-icon @click="${() => {
							store.dispatch(toggleDarkMode())
							// logout met reducer
					  }}" class="fas fa-adjust" path-prefix="/node_modules"/></fa-icon></span>
                    <app-button padding="7px 35px" @click="${() => {
											window.localStorage.clear()
											window.location.pathname = '/'
										}}">Uitloggen</app-button>`
					: //Niet ingelogd

					  html`<span id="greet"><fa-icon class="fas fa-adjust"  @click="${() => {
							store.dispatch(toggleDarkMode())
					  }}" path-prefix="/node_modules"/></fa-icon></span>
			<app-button padding="7px 35px" router-link href="/login#main">Inloggen</app-button>`}
				<app-search id="appsearch"></app-search>
			</div>`
	}

	static get styles() {
		//language=CSS
		return css`
			:host {
				display: flex !important;
				flex-direction: row;
				justify-content: space-between;
				height: 125px;
				background-color: var(--button-blue);
				color: var(--text-color);
				padding: 10px;
				border-radius: 5px;
			}

			a {
				display: flex;
				color: inherit; /* blue colors for links too */
				text-decoration: inherit; /* no underline */
			}

			.logo-title > * {
				text-align: left;
			}

			.logo-title > h2 {
				font-size: 16px;
				margin-top: 1px;
			}

			.logo-title > h1 {
				margin-bottom: 1px;
				font-size: 19px;
			}

			.logo-title {
				display: flex;
				flex-direction: column;
				justify-content: center;
			}

			.search-container {
				display: flex;
				align-items: flex-end;
				flex-direction: column;
			}
			#appsearch {
				padding-top: 10px;
			}

			#greet {
				text-align: center;
				margin-top: 5px;
			}

			@media only screen and (max-width: 470px) {
				.logo-title {
					display: none;
				}
			}
		`
	}
}

window.customElements.define('app-header', AppHeader)
