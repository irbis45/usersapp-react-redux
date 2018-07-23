import * as types from '../constants/actionTypes'

export const setFilterOrder = filter => ({
	type: types.SET_FILTER_USERS,
	payload: filter
});

export const setFilterSearch = query => ({
	type: types.SET_QUERY,
	payload: query
});

export const setGroup = () => ({
	type: types.SET_GROUP,
	payload: null
});