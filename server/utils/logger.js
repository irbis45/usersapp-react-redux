import winston from 'winston';

const logger = winston.createLogger({
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({filename: 'combined.log'})
	],
	format    : winston.format.combine(
		winston.format.json()
	)
});

module.exports = logger;