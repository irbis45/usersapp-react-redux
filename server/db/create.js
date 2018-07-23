import mongoose from '../libs/mongoose';
import series from 'async/series';
import {RandomName} from './nameGenerator';
import each from 'async/each';

let insertGroupId = [];

series([
	open,
	dropDatabase,
	requireModels,
	createGroups,
	createUsers
], function ( err, results ) {
	if( err ) throw err;
	console.log(results);
	mongoose.disconnect();

	process.exit(err ? 255 : 0)
});

function open( callback ) {
	mongoose.connection.on('open', callback);
}

function dropDatabase( callback ) {
	const db = mongoose.connection.db;
	db.dropDatabase(callback);
}

function requireModels( callback ) {
	require('../models/group');
	require('../models/user');
	each(Object.keys(mongoose.models), function ( modelName, callback ) {
		mongoose.models[modelName].ensureIndexes(callback)
	}, callback);
}

function createGroups( callback ) {

	let groups = [
		{title: 'Руководство'},
		{title: 'Отдел кадров'},
		{title: 'Отдел тестирования'},
		{title: 'Отдел разработки'},
		{title: 'Отдел маркетинга'}
	];

	each(groups, function ( groupData, callback ) {
		let group = new mongoose.models.Group(groupData);
		insertGroupId.push(group._id);
		group.save(callback);
	}, callback);

}

function createUsers( callback ) {
	let randName = {};
	let users    = [];

	for ( let i = 0; i < 300; i++ ) {
		randName    = RandomName();
		const group = insertGroupId[Math.floor(Math.random() * insertGroupId.length)];

		users.push({
			firstName: randName.fname,
			lastName : randName.lname,
			group  : Math.random() > 0.1 ? group : ''
		});
	}

	each(users, function ( userData, callback ) {
		let user = new mongoose.models.User(userData);
		user.save(callback);
	}, callback);
}