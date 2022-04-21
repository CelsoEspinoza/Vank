'use strict';

const Joi = require('joi');
const handler = require('./invoice-update.handler');

const route = {
	path: '/invoices',
	method: 'PATCH',
	handler,
	options: {
		auth: 'token',
		validate: {
			payload: {
				tax_id: Joi.string(),
				currency: Joi.string().valid('USD', 'EUR', 'CLP'),
			},
		},
	},
};

module.exports = route;
