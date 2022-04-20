'use strict';

const Hapi = require('hapi');
const objection = require('./src/config/objection');
const validateToken = require('./authentication');
const AuthBearer = require('hapi-auth-bearer-token');
const clientRoute = require('./src/api/clients/clients-create.route');
const invoiceRoute = require('./src/api/invoice/invoice-register.route');

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

	await server.register(AuthBearer);
	server.auth.strategy('token', 'bearer-access-token', {
		validate: validateToken,
	});

	server.route(clientRoute);
	server.route(invoiceRoute);
    
	await server.start();
	console.log(`Server is running at ${server.info.uri}`);
}

process.on('unhandledRejection', (err) => {
	console.log(err);
	process.exit(1);
});

initServer();