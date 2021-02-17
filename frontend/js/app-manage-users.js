/*Contributors: Daniel, Nick */

import {LitElement, html, css} from 'lit-element'
import 'fa-icons'
import store from '../redux'
import {connect} from 'pwa-helpers/connect-mixin'

export class appManageUsers extends connect(store)(LitElement) {
	static get properties() {
		return {
			_students: {type: Array},
			_authors: {type: Array},
			_admins: {type: Array},
			_functie: {type: String},
			_emailLoggedInUser: {type: String},
		}
	}

	stateChanged(state) {
		this._emailLoggedInUser = state.userStore.email
	}

	constructor() {
		super()
		this._students = []
		this._authors = []
		this._admins = []
		sendAuthenticated(`/api/getUsers`)
			.then(response => {
				response.map(user => {
					switch (user.functie) {
						case 'auteur':
							this._authors.push(user)
							break
						case 'admin':
							this._admins.push(user)
							break
						case 'student':
							this._students.push(user)
							break
					}
				})
			})
			.then(() => this.requestUpdate())
	}

	checkBlocked(user) {
		if (user.blocked) {
			return html` <fa-icon title="Blokkeer gebruiker" @click="${e => this.toggleBlocked(user, e.target)}" class="fas fa-ban blocked"></fa-icon>`
		} else {
			return html` <fa-icon title="Blokkeer gebruiker" @click="${e => this.toggleBlocked(user, e.target)}" class="fas fa-ban"></fa-icon>`
		}
	}

	toggleBlocked(user, target) {
		sendAuthenticated(`/api/updateUser/${user.email}`, {blocked: !user.blocked}).then(() => {
			target.classList.toggle('blocked')
		})
	}

	toggleToStudent(user) {
		delete this._authors[this._authors.indexOf(user)]
		user.functie = 'student'
		this._students.push(user)
		return sendAuthenticated(`/api/updateUser/${user.email}`, {functie: 'student'})
	}

	toggleToAuthor(user) {
		delete this._students[this._students.indexOf(user)]
		delete this._admins[this._admins.indexOf(user)]
		this._authors.push(user)
		user.functie = 'auteur'
		return sendAuthenticated(`/api/updateUser/${user.email}`, {functie: 'auteur'})
	}

	toggleToAdmin(user) {
		delete this._authors[this._authors.indexOf(user)]
		this._admins.push(user)
		user.functie = 'admin'
		return sendAuthenticated(`/api/updateUser/${user.email}`, {functie: 'admin'})
	}

	deleteUser(user) {
		if (confirm('Weet u zeker dat u ' + user.fullName + ' wilt verwijderen? \n Dit kunt u niet ongedaan maken.')) {
			if (user.functie === 'auteur') {
				delete this._authors[this._authors.indexOf(user)]
			} else {
				delete this._students[this._students.indexOf(user)]
			}
			sendAuthenticated(`/api/deleteUser/${user.email}`).then(() => this.requestUpdate())
		}
	}

	mapStudent(user) {
		return html` <span id="icon-holder">
			<fa-icon title="Maak gebruiker auteur" @click="${() => this.toggleToAuthor(user).then(() => this.requestUpdate())}" class="fas fa-pencil-alt"></fa-icon>
			${this.checkBlocked(user)}
			<fa-icon title="Verwijder gebruiker" @click="${() => this.deleteUser(user)}" class="fas fa-trash-alt"></fa-icon>
		</span>`
	}

	mapAuthor(user) {
		return html` <span id="icon-holder">
			<fa-icon title="Maak gebruiker student" @click="${() => this.toggleToStudent(user).then(() => this.requestUpdate())}" class="fas fa-pencil-alt author"></fa-icon>
			<fa-icon title="Maak gebruiker admin" @click="${() => this.toggleToAdmin(user).then(() => this.requestUpdate())}" class="fas user-shield"></fa-icon>
			${this.checkBlocked(user)}
			<fa-icon
				title="Verwijder gebruiker"
				@click="${() => {
					this.deleteUser(user)
				}}"
				class="fas fa-trash-alt"
			></fa-icon>
		</span>`
	}

	mapAdmin(user) {
		return html` <span id="icon-holder">
			<fa-icon title="Maak gebruiker auteur" @click="${() => this.toggleToAuthor(user).then(() => this.requestUpdate())}" class="fas user-shield admin"></fa-icon>
			${this.checkBlocked(user)}
		</span>`
	}

	render() {
		return html` <h2>Gebruikers beheren</h2>
			<h3>Legenda:</h3>
			<p>
				<fa-icon class="fas user-shield admin"></fa-icon> Maak gebruiker admin<br />
				<fa-icon class="fas fa-pencil-alt author"></fa-icon> Maak gebruiker auteur<br />
				<fa-icon class="fas fa-trash-alt"></fa-icon> Verwijder gebruiker<br />
				<fa-icon class="fas fa-ban"></fa-icon> Blokkeer gebruiker
			</p>
			<div id="flex-container">
				<ul class="usercontainer">
					<h2>Studenten</h2>
					${this._students.map(user => html` <li>${user.fullName} ${this.mapStudent(user)}</li> `)}
				</ul>
				<ul class="usercontainer">
					<h2>Auteurs</h2>
					${this._authors.map(
						user => html`
							<li>
								${user.fullName}
								${user.email === 'admin@tester.nl' || user.email === 'auteur@tester.nl'
									? html``
									: html` <!--Students and authors can't see this page. -->
											${this.mapAuthor(user)}`}
							</li>
						`
					)}
				</ul>
				<ul class="usercontainer">
					<h2>Admins</h2>
					${this._admins.map(user => html` <li>${user.fullName} ${user.email === this._emailLoggedInUser || user.email === 'admin@tester.nl' || user.email === 'auteur@tester.nl' ? html`` : html`${this.mapAdmin(user)}`}</li> `)}
				</ul>
			</div>`
	}

	static get styles() {
		// language=css
		return css`
			:host {
				min-height: 100%;
				color: var(--text-color);
			}

			#flex-container {
				display: flex;
				grid-template-columns: 3fr 1fr;
			}

			.usercontainer {
				padding: 0px;
				width: 40%;
				margin-right: 12px;
			}

			ul {
				list-style-type: none;
				padding: 0;
			}

			li {
				border-bottom: 1px solid gray;
				padding: 4px 0;
			}

			li:hover {
				background-color: var(--menu-hover);
			}

			li:hover #icon-holder {
				transition: 0.4s all ease-in-out;
				opacity: 1;
			}

			.sub-item {
				padding-left: 10px;
			}

			#icon-holder {
				float: right;
				opacity: 0.2;
			}

			.author {
				color: green;
				transform: scale(1.1);
			}

			.blocked {
				color: red;
				transform: scale(1.1);
			}

			.admin {
				color: blue;
				transform: scale(1.1);
			}

			fa-icon {
				color: #808080;
				width: 1em;
				height: 1em;
				padding: 0 3px;
				cursor: pointer;
			}

			fa-icon:hover {
				transform: scale(1.3);
			}

			#test {
				display: none;
			}
		`
	}
}

customElements.define('app-manage-users', appManageUsers)
