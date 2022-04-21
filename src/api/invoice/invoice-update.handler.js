'use strict';

const Boom = require('boom');
const Client = require('../../models/Client');

async function handler(request, h) {
	try {
		const { id: client_id, currency: clientCurrency } = request.auth.credentials;
		const { payload } = request;
		if (clientCurrency === payload.currency) {
			delete payload.currency;
		}
		return await Client.update(client_id, payload);
	} catch (error) {
		return Boom.badImplementation(error, error);
	}
}

module.exports = handler;
