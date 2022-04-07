"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbConnection_1 = __importDefault(require("../configs/dbConnection"));
exports.default = async (username) => {
    try {
        const dbData = await dbConnection_1.default.query("SELECT id FROM users WHERE username=$1", [username]);
        const isUserAlreadyExists = dbData.rows.length !== 0;
        return isUserAlreadyExists;
    }
    catch (error) {
        console.error(error.message);
    }
};
