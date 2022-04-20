'use strict';

exports.up = knex =>
	knex('clients')
		.del()
		.then(() =>
			knex('clients').insert([
				{
					id: 1,
					company_name: 'CREA',
					internal_code: 1,
					currency: 'USD',
                    api_count: 0,
                    bank_registers: null,
				},
			]),
		);

exports.down = knex => knex.schema.raw('DELETE FROM clients WHERE id = 1;');