import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
		firstName: {type: String, required: true},
		lastName : {type: String, required: true},
		group    : {
			title: {type: String}
		}
	},
	{
		timestamps: true
	});

mongoose.model('User', UserSchema);