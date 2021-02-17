/*Contributors: Ruben, Marlon */

import {configureStore, combineReducers} from '@reduxjs/toolkit'

import userStore from './userStore.js'
import bookmarkStore from './bookmarkStore.js'

const store = configureStore({
	reducer: combineReducers({
		userStore,
		bookmarkStore,
	}),
})

store.subscribe(() => {
	const userStore = store.getState().userStore
	localStorage.setItem('userStore', JSON.stringify(userStore))
	const bookmarkStore = store.getState().bookmarkStore
	localStorage.setItem('bookmarks', JSON.stringify(bookmarkStore))
	if (userStore.jwt) sendAuthenticated('/api/setBookmarks', bookmarkStore)
})

export default store
