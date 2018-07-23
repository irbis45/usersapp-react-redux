import * as types from '../constants/actionTypes'

export const getGroups = groups => ({
	type: types.GET_GROUPS,
	payload: groups
});