'use strict';

const Hapi = require('hapi');
const objection = require('./src/config/objection');

const initServer = async () => {
	const options = {
		port: process.env.PORT || 3000,
		host: process.env.HOST || 'localhost',
	};
	const server = Hapi.server(options);

    objection.initConnection();
    
	await server.start();
	console.log(`Server is running at ${server.info.uri}`);
}

process.on('unhandledRejection', (err) => {
	console.log(err);
	process.exit(1);
});

initServer();