import * as types from '../constants/actionTypes'

const initialState = {
	isLoaded: false,
	items: null
};

export default (state = initialState, action) => {
	switch(action.type) {
		case types.GET_GROUPS:
			return {
				...state,
				items: action.payload,
				isLoaded: true
			};
		default:
			return state;

	}
}