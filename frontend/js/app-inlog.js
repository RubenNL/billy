/*Contributors: Daniel, Nick, Gianni, Marlon */

import {css, LitElement, html} from 'lit-element'
import {connect} from 'pwa-helpers/connect-mixin.js'
import store from '../redux/index.js'
import {login} from '../redux/userStore.js'

export class appInlog extends connect(store)(LitElement) {
	static get properties() {
		return {
			_data: {type: Object},
			location: Object,
		}
	}
	constructor() {
		super()
		this._data = {}
	}
	render() {
		//language=HTML
		return html`
			<link rel="stylesheet" href="/bundle.css" />
			<h2>Inloggen</h2>
			<form id="inlogform" @submit="${this._onclick}">
				<div id="inlogformContainer">
					<label for="name">
						Email:
						<input type="email" name="email" id="name" placeholder="Voer uw email in." @input="${this._change}" required />
					</label>
					<label for="password">
						Wachtwoord:
						<input type="password" name="password" id="password" placeholder="Voer uw wachtwoord in." @input="${this._change}" required />
					</label>
				</div>
				<div id="button">
					<input type="submit" value="Login" />
					<label id="registerlink">Nieuwe gebruiker? <a href="/register">Registreer nu!</a></label>
				</div>
			</form>
		`
	}
	_change(e) {
		this._data[e.target.name] = e.target.value
	}

	_onclick(e) {
		e.preventDefault()
		fetch('/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(this._data),
		})
			.then(response => response.json())
			.then(response => {
				if (response.err) alert(response.err)
				else {
					store.dispatch(login(response.key))
					window.dispatchEvent(new CustomEvent('vaadin-router-go', {detail: {pathname: '/'}}))
				}
			})
	}

	static get styles() {
		//language=CSS
		return css`
			:host {
				margin: auto;
			}

			#inlogformContainer,
			#button {
				text-align: left;
				padding-left: 25%;
			}
			#button {
				display: flex;
				align-content: center;
				font-size: 13px;
			}
			#registerlink {
				align-self: flex-end;
				padding-left: 125px;
				margin-top: 1px;
				margin-bottom: 8px;
			}
			#inlogformContainer > label > input:not([type='submit']) {
				text-align: left;
				margin-top: 10px;
				margin-bottom: 10px;
				display: block;
				width: 400px;
				border-radius: 4px;
				padding: 20px;
				border: 1px solid #ccc;
			}
		`
	}
}

customElements.define('app-inlog', appInlog)
