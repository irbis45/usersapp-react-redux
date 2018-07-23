import * as types from '../constants/actionTypes'

const initialState = {
	searchQuery: '',
	filterBy: '',
	isGroup: false,
	filterOrder: {
		all: false,
		firstName: false,
		lastName: false
	}
};

export default (state = initialState, action) => {
	switch(action.type) {
		case types.SET_QUERY:
			return {
				...state,
				searchQuery   : action.payload,
			};
		case types.SET_FILTER_USERS:
			return {
				...state,
				filterBy: action.payload,
				filterOrder: {
					...state.filterOrder,
					[action.payload]: !state.filterOrder[action.payload]
				}
			};
		case types.SET_GROUP:
			return {
				...state,
				isGroup: !state.isGroup,
			};
		default:
			return state;

	}
}