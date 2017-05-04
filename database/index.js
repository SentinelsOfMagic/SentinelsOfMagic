let pgp = require('pg-promise')();
let databaseUrl = process.env.DATABASE_URL || require('./config');

module.exports = pgp(databaseUrl);

