'use strict';

const Joi = require('joi');
const handler = require('./invoice-register.handler');

const route = {
	path: '/invoices',
	method: 'POST',
	handler,
	options: {
		auth: 'token',
		validate: {
			payload: {
				raw_url: Joi.string().uri().required(),
			},
		},
	},
};

module.exports = route;
