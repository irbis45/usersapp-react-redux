import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
		firstName: {type: String, required: true},
		lastName : {type: String, required: true},
		group    : {type: String, default: ''}
	},
	{
		timestamps: true
	});

mongoose.model('User', UserSchema);