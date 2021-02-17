/*Contributors: Ruben, Daniel, Marlon */

import {createSlice, createSelector} from '@reduxjs/toolkit'
import store from './index.js'

const savedState = JSON.parse(localStorage.getItem('userStore')) || {}

//--------- Reducers ---------//
function parseJwt(token) {
	var base64Url = token.split('.')[1]
	var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
	var jsonPayload = decodeURIComponent(
		atob(base64)
			.split('')
			.map(function (c) {
				return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
			})
			.join('')
	)
	return JSON.parse(jsonPayload)
}

function loginReducer(state, action) {
	//{...} betekent dat het object uitelkaar getrokken word en in de array(object wordt gepropt.)
	// Action = jwt="JWT-token" state = huidige  state.
	//Return = {jwt: "token", uitgesplitste onderdelen d.m.v parseJWT}
	return {jwt: action.payload, ...parseJwt(action.payload)}
}

function logoutReducer() {
	return {}
}

function toggleDarkModeReducer(state) {
	return {...state, darkMode: !state.darkMode}
}

//--------- Selectors ---------//
const jwtSelector = createSelector(
	state => state.userStore,
	login => login.jwt
)

const emailSelector = createSelector(
	state => state.userStore,
	login => login.email
)
const nameSelector = createSelector(
	state => state.userStore,
	login => login.fullName
)
const functieSelector = createSelector(
	state => state.userStore,
	login => login.functie
)
const darkModeSelector = createSelector(
	state => state.userStore,
	login => login.darkMode
)

//--------- Slice ---------//
const userStore = createSlice({
	name: 'userStore',
	initialState: savedState,
	reducers: {
		login: loginReducer,
		logout: logoutReducer,
		toggleDarkMode: toggleDarkModeReducer,
	},
})

//--------- Export slice values ---------//
export const getJwt = () => jwtSelector(store.getState())
export const getEmail = () => emailSelector(store.getState())
export const getName = () => nameSelector(store.getState())
export const getFunctie = () => functieSelector(store.getState())
export const getDarkMode = () => darkModeSelector(store.getState())

//--------- Export slice actions ---------//
export const {login, logout, toggleDarkMode} = userStore.actions

//--------- Export slice reducer ---------//
export default userStore.reducer
