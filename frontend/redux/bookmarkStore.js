/*Contributors: Ruben */

import {createSlice, createSelector} from '@reduxjs/toolkit'
import store from './index.js'

const savedState = JSON.parse(localStorage.getItem('bookmarks')) || []

//--------- Reducers ---------//
function toggleReducer(state, action) {
	if (state.find(bookmark => bookmark == action.payload)) return state.filter(bookmark => bookmark != action.payload)
	else return [...state, action.payload]
}
function setReducer(state, action) {
	return action.payload
}

//--------- Selectors ---------//
const isBookmarkedSelector = createSelector(
	(state, searchBookmark) => Boolean(state.bookmarkStore.find(bookmark => bookmark === searchBookmark)),
	isBookmarked => isBookmarked
)

//--------- Slice ---------//
const bookmarkStore = createSlice({
	name: 'bookmarkStore',
	initialState: savedState,
	reducers: {
		toggle: toggleReducer,
		set: setReducer,
	},
})

//--------- Export slice values ---------//
export const isBookmarked = bookmark => isBookmarkedSelector(store.getState(), bookmark)

//--------- Export slice actions ---------//
export const {toggle, set} = bookmarkStore.actions

//--------- Export slice reducer ---------//
export default bookmarkStore.reducer
