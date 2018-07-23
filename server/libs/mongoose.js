import config from '../../config';
import log from '../utils/logger';
import mongoose from 'mongoose';

if (process.env.NODE_ENV !== 'production'){
	mongoose.set('debug', config.get('mongoose:debug'));
}

mongoose.Promise = global.Promise;

mongoose.connect(`mongodb://${config.get('mongoose:host')}:${config.get('mongoose:port')}/${config.get('mongoose:name')}`, config.get('mongoose:options'));

mongoose.connection.on('connected', () => {
	log.info(`Success connection DB: ${config.get('mongoose:name')}!`);
});

mongoose.connection.on('error', ( err ) => {
	log.error(`Failed to connect to DB: ${config.get('mongoose:name')}`, err);
});

mongoose.connection.on('disconnected', () => {
	log.info(`Disconnected DB: ${config.get('mongoose:name')}!`);
});

export default mongoose;
