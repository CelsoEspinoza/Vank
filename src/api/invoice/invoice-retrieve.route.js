'use strict';

const Joi = require('joi');
const handler = require('./invoice-retrieve.handler');

const route = {
	path: '/invoices',
	method: 'GET',
	handler,
	options: {
		auth: 'token',
		validate: {
			query: {
				vendor_id: Joi.number().integer(),
				invoice_date_start: Joi.date(),
				invoice_date_end: Joi.date(),
				currency: Joi.string(),
			},
		},
	},
};

module.exports = route;
