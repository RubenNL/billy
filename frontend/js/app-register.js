/*Contributors: Gianni, Nick, Marlon*/

import {css, LitElement, html} from 'lit-element'

export class appRegister extends LitElement {
	static get properties() {
		return {
			_data: {type: Object},
		}
	}

	static get styles() {
		//language=CSS
		return css`
			:host {
				margin: auto;
			}

			.informationBlock > h3 {
				display: block;
			}

			.informationBlock {
				padding-left: 100px;
			}

			label > input,
			label > select {
				text-align: left;
				margin-top: 10px;
				margin-bottom: 10px;
				width: 400px;
				display: block;
				border-radius: 4px;
				padding: 15px;
				border: 1px solid #ccc;
				box-sizing: border-box;
			}
			input[type='submit'] {
				margin-top: 40px;
			}
			#registerform {
				display: flex;
			}
		`
	}

	constructor() {
		super()
		this._data = {functie: 'student'}
	}

	render() {
		return html`
			<link rel="stylesheet" href="/bundle.css" />
			<h2>Registreren</h2>
			<form id="registerform" @submit="${this._onclick}">
				<div id="registerformContainer" class="informationBlock">
					<h3>Account informatie</h3>
					<label for="email"
						>E-mail:
						<input type="email" name="email" id="email" tabindex="1" placeholder="Voer uw email in." @input="${this._change}" required />
					</label>
					<label for="password"
						>Wachtwoord:
						<input type="password" name="password" id="password" tabindex="2" placeholder="Voer uw wachtwoord in." @input="${this._change}" required />
					</label>
					<label for="confirmpassword"
						>Bevestig wachtwoord:
						<input type="password" name="password" id="confirmpassword" tabindex="3" placeholder="Voer uw wachtwoord in." @input="${this._change}" required />
					</label>
				</div>
				<div id="information" class="informationBlock">
					<h3>Persoonlijke informatie</h3>
					<label for="name"
						>Naam:
						<input type="text" name="fullName" id="name" tabindex="4" placeholder="Voer uw naam in." @input="${this._change}" required />
					</label>
					<label for="organisation"
						>Organisatie:
						<input type="text" name="orgName" id="organisation" tabindex="6" placeholder="Voer uw organisatie in." @input="${this._change}" required />
					</label>
					<input type="submit" value="Registreren" tabindex="0" />
				</div>
			</form>
		`
	}

	_change(e) {
		this._data[e.target.name] = e.target.value
	}
	_onclick(e) {
		e.preventDefault()
		var password = this.shadowRoot.querySelector('#password').value
		var confirmPassword = this.shadowRoot.querySelector('#confirmpassword').value
		if (password !== confirmPassword) {
			alert('Wachtwoorden komen niet overeen!')
			return
		}

		fetch('/api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(this._data),
		})
			.then(response => response.json())
			.then(response => {
				if (response.err) {
					alert(response.err)
					return
				}
				alert('Account aangemaakt, log nu in.')
				window.location.pathname = '/login'
			})
	}
}

customElements.define('app-register', appRegister)
