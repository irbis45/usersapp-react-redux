import * as types from '../constants/actionTypes'

const initialState = {
	isLoaded: false,
	users: null
};

export default (state = initialState, action) => {
	switch(action.type) {
		case types.GET_USERS:
			return {
				...state,
				users: action.payload,
				isLoaded: true
			};
		case types.ADD_USER:
			return {
				...state,
				users: [
					...state.users,
					action.payload
				],
				isLoaded: true
			};
		default:
			return state;

	}
}