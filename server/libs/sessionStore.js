import session from 'express-session';
import mongoose from 'mongoose';

const MongoStore = require('connect-mongo')(session);
const sessionStore = new MongoStore({mongooseConnection: mongoose.connection});

module.exports = sessionStore;