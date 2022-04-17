'use strict';

const { Model } = require('objection');

class Client extends Model {
	static get tableName() {
		return 'clients';
	}

	static get jsonSchema() {
		const schema = {
			type: 'object',
			properties: {
				bank_registers: {
					type: 'array',
				},
			},
		};
		return schema;
	}

	static create(data) {
		return this.query().insert(data);
	}
}

module.exports = Client;
