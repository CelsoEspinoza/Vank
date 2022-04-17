'use strict';

const Joi = require('joi');
const handler = require('./clients-create.handler');

const route = {
	path: '/clients',
	method: 'POST',
	handler,
	options: {
		validate: {
			payload: {
				company_name: Joi.string().required(),
				internal_code: Joi.string().required(),
				currency: Joi.string().valid('USD', 'EUR', 'CLP'),
				bank_registers: Joi.array().items(Joi.number().integer().required()).allow(null),
			},
		},
	},
};

module.exports = route;
