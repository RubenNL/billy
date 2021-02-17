/*Contributors: Ruben */

import store from '../redux/index.js'

function sendAuthenticated(url, data) {
	const jwt = store.getState().userStore.jwt
	if (!jwt) alert('Niet ingelogd!')
	else
		return fetch(url, {
			headers: {
				Authorization: 'Bearer ' + jwt,
			},
			method: data ? 'POST' : 'GET',
			body: JSON.stringify(data),
		})
			.then(response => response.json())
			.then(response => {
				if (response.err == 'no access') {
					alert('geen toegang tot deze pagina!')
					throw Error
				}
				return response
			})
}
window.sendAuthenticated = sendAuthenticated
export default sendAuthenticated
