'use strict';

const Hapi = require('hapi');
const objection = require('./src/config/objection');
const clientRoute = require('./src/api/clients/clients-create.route');

const initServer = async () => {
	const options = {
		port: process.env.PORT || 3000,
		host: process.env.HOST || 'localhost',
	};
	const server = Hapi.server(options);

    objection.initConnection();

	server.route({
		method: 'GET',
		options: {
			auth: false,
		},
		path: '/health-check',
		handler: function (request, h) {
			return 'OK';
		}
	});

	server.route(clientRoute);
    
	await server.start();
	console.log(`Server is running at ${server.info.uri}`);
}

process.on('unhandledRejection', (err) => {
	console.log(err);
	process.exit(1);
});

initServer();