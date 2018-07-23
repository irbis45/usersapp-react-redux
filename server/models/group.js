import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const GroupSchema = new Schema({
		title : {type: String, required: true, unique: true},
	});

mongoose.model('Group', GroupSchema);