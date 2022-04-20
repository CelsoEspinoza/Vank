'use strict';

const { Model } = require('objection');

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
}

module.exports = Client;
