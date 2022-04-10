"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("pg"));
// Access to .env variables
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const normalizePort = require('normalize-port');
// Return date values from postgres as strings as is
// 1082 is OID for date in Postgres
const DATE_OID = 1082;
const TIMETZ_OID = 1266;
pg_1.default.types.setTypeParser(TIMETZ_OID, (str) => {
    if (str.length === 14)
        return str;
    return str + ":00";
});
pg_1.default.types.setTypeParser(DATE_OID, (str) => {
    return str;
});
// PG-object for writing commands to database
const Pool = pg_1.default.Pool;
// Configuration for development build
const devConfig = {
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    port: normalizePort(process.env.PG_PORT),
    database: process.env.PG_DATABASE
};
// Configuration for production build
const proConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
};
const NODE_ENV = process.env.NODE_ENV;
const pool = new Pool(NODE_ENV === "production" ? proConfig : devConfig);
// const pool = new Pool(devConfig);
exports.default = pool;
