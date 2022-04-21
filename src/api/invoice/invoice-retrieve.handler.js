'use strict';

const Boom = require('boom');
const axios = require('axios');
const Invoice = require('../../models/Invoice');

async function handler(request, h) {
	try {
		const { id, currency: clientCurrency } = request.auth.credentials;
		const invoices = await Invoice.getAllByClient(id, request.query);
		const { currency: currencyChosen } = request.query;
		const converterApiKey = process.env.CURRENCY_CONVERTER_API_KEY;
		if (!converterApiKey) {
			return Boom.badRequest('Convertion not supported yet');
		}
		if (currencyChosen && clientCurrency != currencyChosen) {
			const convertion = clientCurrency.toUpperCase() + '_' + currencyChosen.toUpperCase();
			const { data } = await axios.get(`https://free.currconv.com/api/v7/convert?q=${convertion}&compact=ultra&apiKey=${converterApiKey}`);
			let currencyValueConvertion = data[convertion];
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
