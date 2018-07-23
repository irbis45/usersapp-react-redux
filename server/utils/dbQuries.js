import mongoose from '../libs/mongoose';
import _find from 'lodash/find';

import '../models/user';
import '../models/group';

const User  = mongoose.connection.model('User');
const Group = mongoose.connection.model('Group');

export function addUser( data ) {

	const user = new User({
		firstName: data.firstName,
		lastName : data.lastName,
		group    : data.group
	});

	return user.save();
}

export function addGroup( data ) {

	const group = new Group({
		title: data.title
	});

	return group.save();
}

export function getUsers() {
	return User.find({});
}

export function getGroups() {
	return Group.find({});
}

export function getGroup( id ) {
	return Group.findById(id.trim());
}

export function addAndGetUser( data ) {
	const group = data.group === '' || data.group === '-' ? '' : data.group;

	const userField = {
		firstName: data.firstName,
		lastName : data.lastName,
		group    : group
	};

	const user = new User(userField);

	return new Promise(( resolve, reject ) => user.save().then(() => {

		if( group ) {

			getGroup(group).then(result => {

				resolve({
					id        : user._id,
					...userField,
					groupTitle: result.title
				});

			}).catch(err => reject(err));
		} else {
			resolve({
				id   : user._id,
				...userField,
				groupTitle: ''
			});
		}
	}).catch(err => reject(err)));
}

export function getList() {

	return Promise.all([
		User.find({}),
		Group.find({})
	]).then(results => {
		const users = [];

		for ( let key in results[0] ) {
			const groupInfo = results[0][key].group && _find(results[1], o => o._id.toString() === results[0][key].group.trim());
			users.push({
				id        : results[0][key]._id,
				firstName : results[0][key].firstName,
				lastName  : results[0][key].lastName,
				group     : groupInfo._id || 0,
				groupTitle: groupInfo.title || ''
			});
		}

		return users;
	});
}