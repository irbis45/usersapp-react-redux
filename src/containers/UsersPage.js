import {connect} from 'react-redux';
import _orderBy from 'lodash/orderBy';
import _filterBy from 'lodash/filter';
import _groupBy from 'lodash/groupBy';

import {bindActionCreators} from 'redux';
import * as usersActions from '../actions/user';

import UsersPage from '../pages/users';

const searchFilter = ( users, filterBy, filterOrder, searchQuery, isGroup ) => {
	users = _filterBy(users, o => o.firstName.toLowerCase().includes(searchQuery.toLowerCase()) || o.lastName.toLowerCase().includes(searchQuery.toLowerCase()));

	const order = filterOrder[filterBy] ? 'desc' : 'ask';
	switch ( filterBy ) {
		case 'firstName':
			users = _orderBy(users, 'firstName', order);
			break;
		case 'lastName':
			users = _orderBy(users, 'lastName', order);
			break;
		default:
			break;
	}

	if( isGroup ) {
		users = _groupBy(users, 'group');
	}

	return users;
};

const mapStateToProps = ( {users, filter, group} ) => ({
	users   : searchFilter(users.users, filter.filterBy, filter.filterOrder, filter.searchQuery, filter.isGroup),
	isLoaded: users.isLoaded,
	isGroup : filter.isGroup,
	groups  : group.items,
});

const mapDispatchToProps = dispatch => ({
	...bindActionCreators(usersActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
