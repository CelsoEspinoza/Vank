'use strict';

exports.up = function(knex) {
	return knex.schema.table('clients', (table) => {
        table.text('tax_id').nullable().after('internal_code');
    });
};

exports.down = function(knex) {
	return knex.schema.table('clients', (table) => {
        table.dropColumn('tax_id');
	})
};
