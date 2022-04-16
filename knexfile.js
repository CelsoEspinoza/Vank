'use strict';

require('dotenv').config();

const config = {
	development: {
		client: 'mysql',
		debug: true,
        version: '5.7',
		connection: {
			database: process.env.DB_NAME_DEV,
			host: process.env.DB_HOST_DEV,
			user: process.env.DB_USER_DEV,
			password: process.env.DB_PASS_DEV,
			port: process.env.DB_PORT_DEV,
		},
		migrations: {
			tableName: process.env.DB_TABLE_MIGRATIONS,
		},
	},
};

module.exports = config[process.env.NODE_ENV];
