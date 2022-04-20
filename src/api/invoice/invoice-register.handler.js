'use strict';

const Boom = require('boom');
const axios = require('axios');
const Invoice = require('../../models/Invoice');
const moment = require('moment');

async function handler(request, h) {
	try {
		const { id } = request.auth.credentials;
		const { raw_url } = request.payload;
		const { data: invoices } = await axios.get(raw_url);
		const rows = invoices.split('\n');
		const formatDate = (date) => {
			if (date) {
				return moment(date).format('YYYY-MM-DD')
			}
			return null;
		};
		const invoicesToInsert = rows.slice(1).map(row => {
			const values = row.split(',');
			const invoice = {
				"client_id": id,
				"vendor_id": values[1],
				"invoice_number": values[2],
				"invoice_date": formatDate(values[3]),
				"invoice_total": values[4],
				"payment_total": values[5],
				"credit_total": values[6],
				"bank_id": values[7],
				"invoice_due_date": formatDate(values[8]),
				"payment_date": formatDate(values[9]),
				"currency": values[10]
			};
			if (values[0]) {
				invoice.id = values[0];
			}
			return invoice;
		});
		const invoicesAdded = await Invoice.createMultiple(invoicesToInsert);
		return invoicesAdded;
	} catch (error) {
		return Boom.badImplementation(error, error);
	}
}

module.exports = handler;
