const pg = require("pg");

// Return date values from postgres as strings as is
// 1082 is OID for date in Postgres
const DATE_OID = 1082;
const TIMETZ_OID = 1266;
pg.types.setTypeParser(TIMETZ_OID, str => {
    if (str.length === 14) return str;
    return str + ":00";
});
pg.types.setTypeParser(DATE_OID, str => {
    return str;
});

// PG-object for writing commands to database
const Pool = pg.Pool;

// Access to .env variables
require("dotenv").config();

// Configuration for development build
const devConfig = {
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE
};

// Configuration for production build
const proConfig = {
    connectionString: process.env.DATABASE_URL, // from heroku addons
    ssl: {
        rejectUnauthorized: false
    }
};

const pool = new Pool(process.env.NODE_ENV === "production" ? proConfig : devConfig);

module.exports = pool;