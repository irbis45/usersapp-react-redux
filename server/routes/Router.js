import * as db from '../utils/dbQuries';
import express from 'express';

const router = express.Router();

router.get('/', ( req, res ) => {
	res.send('Mok server!');
});

router.get('/get_users', ( req, res ) => {
	db.getUsers().then(data => {
		res.status(200).send(data);
	}).catch(err => {
		console.error(err);
		res.status(500).end();
	});
});

router.get('/get_groups', ( req, res ) => {
	db.getGroups().then(data => {
		res.status(200).send(data);
	}).catch(err => {
		console.error(err);
		res.status(500).end();
	});
});

router.post('/add_user', ( req, res ) => {

	db.addUser(req.body).then(data => {
		res.status(200).send(data);
	}).catch(err => {
		console.error(err);
		res.status(500).end();
	});
});

router.get('*', (req, res) => {
	res.status(404).send('Not Found!');
});

module.exports = router;