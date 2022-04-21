'use strict';

const Client = require('./src/models/Client');

async function authenticate(request, token) {
	try {
		// dummy authentication
		const validToken = 'unique.valid.token.123';
		if (token === validToken) {
			// TODO implement a cache solution to bring client info
			const client = await Client.getById(1);
			console.log("adsfadsfasdf", client);
			return { isValid: true, credentials: client };
		}
	} catch (error) {
		console.log(`Error to validate token ${error}`);
	}
	return { isValid: false, credentials: {} };
}

module.exports = authenticate;
