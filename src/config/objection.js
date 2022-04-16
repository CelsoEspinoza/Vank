'use strict';

const objection = require('objection');
const Knex = require('knex');
const knexConfig = require('./../../knexfile');

function initConnection() {
	const knex = Knex(knexConfig);
	objection.Model.knex(knex);
}

const methods = {
	initConnection,
};

module.exports = methods;
