'use strict';

const Boom = require('boom');
const Client = require('./../../models/Client');

async function handler(request, h) {
	try {
		const newClient = await Client.create(request.payload);
		return h.response(newClient).code(201);
	} catch (error) {
		return Boom.badImplementation(error, error);
	}
}

module.exports = handler;
