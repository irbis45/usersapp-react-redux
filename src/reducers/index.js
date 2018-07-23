import { combineReducers } from 'redux';

import users from './user';
import filter from './filter';
import group from './group';

export default combineReducers({
	users,
	filter,
	group
});