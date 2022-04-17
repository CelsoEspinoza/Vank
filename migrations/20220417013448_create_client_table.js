'use strict';

exports.up = knex =>
	knex.schema.hasTable('clients').then(exists => {
		if (!exists) {
			return knex.schema.createTable('clients', table => {
				table.increments('id').primary();
				table.text('company_name').notNullable();
				table.text('internal_code').notNullable();
				table.text('currency').notNullable();
				table.integer('api_count').nullable();
				table.text('bank_registers').nullable();
                table
                    .boolean('flag_active')
                    .notNullable()
                    .defaultTo(true);
                table
                    .timestamp('deleted_at')
                    .nullable()
                    .defaultTo(null);
                table.timestamps(true, true);
			})
			.raw('ALTER TABLE clients MODIFY COLUMN bank_registers JSON;');
		}
		return false;
	});

exports.down = knex => knex.schema.dropTable('clients');
