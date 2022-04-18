'use strict';

const handler = require('./invoice-retrieve.handler');

const route = {
	path: '/invoices',
	method: 'GET',
	handler,
};

module.exports = route;
