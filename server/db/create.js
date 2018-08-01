import mongoose from '../libs/mongoose';
import series from 'async/series';
import {RandomName} from './nameGenerator';
import each from 'async/each';

series([
	open,
	dropDatabase,
	requireModels,
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
	require('../models/user');
	each(Object.keys(mongoose.models), function ( modelName, callback ) {
		mongoose.models[modelName].ensureIndexes(callback)
	}, callback);
}

function createUsers( callback ) {
	let randName = {};
	let users    = [];

	let groups = [
		{title: 'Руководство'},
		{title: 'Отдел кадров'},
		{title: 'Отдел тестирования'},
		{title: 'Отдел разработки'},
		{title: 'Отдел маркетинга'}
	];

	for ( let i = 0; i < 300; i++ ) {
		randName    = RandomName();
		const group = groups[Math.floor(Math.random() * groups.length)];

		users.push({
			firstName: randName.fname,
			lastName : randName.lname,
			group  : Math.random() > 0.1 ? group : []
		});
	}

	each(users, function ( userData, callback ) {
		let user = new mongoose.models.User(userData);
		user.save(callback);
	}, callback);
}