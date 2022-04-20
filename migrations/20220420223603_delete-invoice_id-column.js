
exports.up = knex =>
    knex.schema.table('invoices', table => {
        table.dropColumn('invoice_id');
    });

exports.down = knex =>
    knex.schema.table('invoices', table => {
        table.integer('invoice_id').notNullable();
    });
