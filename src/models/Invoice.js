'use strict';

const { Model, raw } = require('objection');
const moment = require('moment');

class Client extends Model {
	static get tableName() {
		return 'invoices';
	}

	static createMultiple(data) {
		const options = {
			noDelete: true,
			insertMissing: true,
		}
		return this.query().upsertGraph(data, options);
	}

	static getAllByClient(clientId, filters = {}) {
		const query = this.query()
			.select('id', 'vendor_id', 'invoice_number', 'invoice_total', 'payment_total', 'credit_total', 'bank_id', 'currency')
			.where('client_id', clientId)
			.skipUndefined()
			.where('vendor_id', filters.vendor_id);

		if (filters.invoice_date_start) {
			query.where('invoice_date', '>=', moment(filters.invoice_date_start).format('YYY-MM-DD'));
		}
		if (filters.invoice_date_end) {
			query.where('invoice_date', '<=', moment(filters.invoice_date_end).format('YYY-MM-DD'));
		}

		return query;
	}

	static updateByClientId(client_id, currencyValueConvertion, newCurrency) {
		return this.query()
			.patch({ 
				invoice_total: raw('invoice_total * ?', [currencyValueConvertion]),
				payment_total: raw('payment_total * ?', [currencyValueConvertion]),
				credit_total: raw('credit_total * ?', [currencyValueConvertion]),
				currency: newCurrency
			})
			.where('client_id', client_id);
	}
}

module.exports = Client;
