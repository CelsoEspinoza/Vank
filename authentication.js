'use strict';

function authenticate(request, token) {
	try {
		let isValid = false;
		// dummy authentication
		const validToken = 'unique.valid.token.123';
		if (token === validToken) {
			isValid = true;
			const credentials = {
				id: 1,
				company_name: 'CREA',
				internal_code: '1',
				currency: 'USD',
			};
			return { isValid, credentials };
		}
	} catch (error) {
		console.log(`Error to validate token ${error}`);
	}
	return { isValid: false, credentials: {} };
}

module.exports = authenticate;
