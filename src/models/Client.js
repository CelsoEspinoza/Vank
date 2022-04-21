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

	static update(id, data) {
		return this.query()
			.patch(data)
			.where('id', id);
	}

	static getById(id) {
		return this.query()
			.select('id', 'company_name', 'currency')
			.where('id', id)
			.first();
	}
}

module.exports = Client;
