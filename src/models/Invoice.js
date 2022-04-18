'use strict';

const { Model } = require('objection');

class Client extends Model {
	static get tableName() {
		return 'invoices';
	}

	static createMultiple(data) {
		return this.query().insertGraph(data);
	}
}

module.exports = Client;
