'use strict';

const Boom = require('boom');
const axios = require('axios');
const Invoice = require('./../../models/Invoice');
const moment = require('moment');

async function handler(request, h) {
	try {
		const url = "https://gist.githubusercontent.com/rogelio-meza-t/f70a484ec20b8ea43c67f95a58597c29/raw/41f289c605718e923fc1fad0539530e4d0413a90/invoices.csv";
		const { data: invoices } = await axios.get(url);
		const rows = invoices.split('\n');
		const formatDate = (date) => {
			if (date) {
				return moment(date).format('YYYY-MM-DD')
			}
			return null;
		};
		const rowsToInsert = rows.slice(1).map(row => {
			const values = row.split(',');
			return {
				"client_id": 1,
				"invoice_id": values[0],
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
			}
		});
		const invoicesAdded = await Invoice.createMultiple(rowsToInsert);
		return invoicesAdded;
	} catch (error) {
		return Boom.badImplementation(error, error);
	}
}

module.exports = handler;
