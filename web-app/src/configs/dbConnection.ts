import pg from "pg";
// Access to .env variables
import dotenv from "dotenv";
dotenv.config();
const normalizePort = require("normalize-port");

// Return date values from postgres as strings as is
// 1082 is OID for date in Postgres
const DATE_OID = 1082;
const TIMETZ_OID = 1266;
pg.types.setTypeParser(TIMETZ_OID, (str: String) => {
  if (str.length === 14) return str;
  return str + ":00";
});
pg.types.setTypeParser(DATE_OID, (str: String) => {
  return str;
});

// PG-object for writing commands to database
const Pool = pg.Pool;

// Configuration for development build
const devConfig = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: normalizePort(process.env.PG_PORT),
  database: process.env.PG_DATABASE,
};

// Configuration for production build
const proConfig = {
  connectionString: process.env.PG_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
};

const NODE_ENV = process.env.NODE_ENV;

const pool = new Pool(NODE_ENV === "production" ? proConfig : devConfig);
export default pool;
