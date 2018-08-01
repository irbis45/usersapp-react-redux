import mongoose from '../libs/mongoose';
import _uniqBy from 'lodash/uniqBy';
import '../models/user';

const User = mongoose.connection.model('User');

export function addUser( data ) {
	const user = new User({
		firstName: data.firstName.trim(),
		lastName : data.lastName.trim(),
		group    : data.group  ? {'title': data.group.trim()} : []
	});

	return user.save();
}

export function getUsers() {
	return User.find({});
}

export function getGroups() {

	return new Promise(( resolve, reject ) => {
		User.find({}).select('group.title').exec(function ( error, groups ) {
			if( error ) return reject(error);

			const uniqueGroup = _uniqBy(groups, 'group.title');
			let result = [];

			uniqueGroup.forEach((itm) => {
				itm.group.title && result.push(itm.group.title);
			});

			resolve(result);
		});
	});
}