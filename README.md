# Fraud Backoffice Backend

## Tech Stack

* [NODE.js](https://nodejs.org/es/)
* [MYSQL](https://www.mysql.com/)
* [OBJECTION.JS](https://vincit.github.io/objection.js/)
* [HAPI.JS](https://hapi.dev/)
* [KNEX](http://knexjs.org/)

## How to install and run

1. Create the file `.env` and set the environment variables:

```
# WEB SERVER
NODE_ENV=development
HOST=localhost
PORT=3000

# DATABASE
DB_NAME_DEV=vank_database
DB_HOST_DEV=localhost
DB_USER_DEV=user
DB_PASS_DEV=123456
DB_PORT_DEV=3306
DB_TABLE_MIGRATIONS=vank_migrations

#API_KEYS
CURRENCY_CONVERTER_API_KEY=[API_KEY]
```

2. Execute the command `npm install`.
3. Execute the command `npm run migrate` to run migrations.
4. Execute the command `npm run dev` to run project.
5. Open the link <http://localhost:3000/health-check>
6. Import the VANK.postman_collection.json file in Postman for basic documentation

### Commands
- **npm run dev**: Runs locally
- **npm run migrate**: Runs migrations
- **npm run new-migration <migration-name>**: Creates a new migration file