/*Contributors: Marlon */

import {LitElement, html} from 'lit-element'

export class appButton extends LitElement {
	static get properties() {
		return {
			href: {type: String, reflect: true},
			width: {type: String, reflect: true},
			padding: {type: String, reflect: true},
			margin: {type: String, reflect: true},
			bgColor: {type: String, reflect: true},
			color: {type: String, reflect: true},
			fontSize: {type: String, reflect: true},
		}
	}

	constructor() {
		super()
	}

	render() {
		let width = this.width ? this.width : 'unset'
		let padding = this.padding ? this.padding : '7px 25px'
		let margin = this.margin ? this.margin : 'unset'
		let bg = this.bgColor ? this.bgColor : '#0066c4'
		let color = this.color ? this.color : '#fff'
		let fontSize = this.fontSize ? this.fontSize : '14px'

		//language=html;
		return html`
			<style>
				:host {
					display: inline-block;
					text-align: center;
					width: ${width};
					margin: ${margin};
				}
				a {
					display: block;
					text-align: center;
					text-decoration: none;
					border: none;
					border-radius: 3px;
					box-sizing: border-box;
					cursor: pointer;
					width: ${width};
					padding: ${padding};
					background-color: ${bg};
					color: ${color};
					font-size: ${fontSize};
				}
			</style>
			<a href="${this.href}">
				<slot>${this.innerHTML === '' ? 'Button' : this.innerHTML}</slot>
			</a>
		`
	}
}
customElements.define('app-button', appButton)
