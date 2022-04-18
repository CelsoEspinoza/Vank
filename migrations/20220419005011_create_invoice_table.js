'use strict';

exports.up = knex =>
	knex.schema.hasTable('invoices').then(exists => {
		if (!exists) {
			return knex.schema.createTable('invoices', table => {
				table.increments('id').primary();
                table.integer('client_id').unsigned();
                table
                    .foreign('client_id')
                    .references('id')
                    .inTable('clients');
                table.integer('invoice_id').notNullable();
				table.integer('vendor_id').nullable();
				table.text('invoice_number').nullable();
				table.date('invoice_date').nullable();
                table.decimal('invoice_total', 18, 2);
                table.decimal('payment_total', 18, 2);
                table.decimal('credit_total', 18, 2);
                table.integer('bank_id').nullable();
                table.date('invoice_due_date').nullable();
                table.date('payment_date').nullable();
                table.text('currency').notNullable();
                table
                    .boolean('flag_active')
                    .notNullable()
                    .defaultTo(true);
                table
                    .timestamp('deleted_at')
                    .nullable()
                    .defaultTo(null);
                table.timestamps(true, true);
			});
		}
		return false;
	});

exports.down = knex => knex.schema.dropTable('invoices');
