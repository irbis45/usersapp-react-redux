import * as types from '../constants/actionTypes'

export const getUsers = users => ({
	type: types.GET_USERS,
	payload: users
});


export const addUser = user => ({
	type: types.ADD_USER,
	payload: user
});
