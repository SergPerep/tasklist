// PG-object for writing commands to database
const Pool = require("pg").Pool;

// Access to .env variables
require("dotenv").config();

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE
});

module.exports = pool;