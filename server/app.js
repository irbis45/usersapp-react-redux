import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import favicon from 'serve-favicon';
import errorHandler from 'errorhandler';
import methodOverride from 'method-override';
import session from 'express-session';
import morgan from 'morgan';
import config from '../config';
import routes from './routes/Router'

const app = express(),
      log = require('./utils/logger');

app.use(favicon(__dirname + '/static/favicon.ico'));
app.use(morgan('dev'));
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({'origin': '*'}));
app.use(express.static(path.join(__dirname, 'static')));

app.use(session({
	secret: config.get('session:secret'),
	key: config.get('session:key'),
	resave: false,
	cookie: config.get('session:cookie'),
	store: require('./libs/sessionStore'),
	saveUninitialized: false
}));

if( 'development' == app.get('env') ) {
	app.use(errorHandler());
}

app.use(routes);

app.listen((config.get('serverPort')), () => {
	log.info(`Server start on ${config.get('serverPort')} port!`);
});
