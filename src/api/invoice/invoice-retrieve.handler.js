'use strict';

const Boom = require('boom');
const Invoice = require('../../models/Invoice');
const Converter = require('../../models/Converter');

async function handler(request, h) {
	try {
		const { id, currency: clientCurrency } = request.auth.credentials;
		const invoices = await Invoice.getAllByClient(id, request.query);
		const { currency: currencyChosen } = request.query;
		if (currencyChosen && clientCurrency != currencyChosen) {
			const currencyValueConvertion = await Converter.convertCurrency(clientCurrency, currencyChosen);
			return invoices.map(invoice => ({
				...invoice,
				invoice_total: invoice.invoice_total * currencyValueConvertion,
				payment_total: invoice.payment_total * currencyValueConvertion,
				credit_total: invoice.credit_total * currencyValueConvertion,
				currency: currencyChosen,
			}));
		}
		return invoices;
	} catch (error) {
		return Boom.badImplementation(error, error);
	}
}

module.exports = handler;
