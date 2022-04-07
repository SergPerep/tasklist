"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbConnection_1 = __importDefault(require("../../configs/dbConnection"));
const color_list = async (req, res) => {
    const colors = await dbConnection_1.default.query(`
        SELECT
            id,
            name,
            value
        FROM 
            color`);
    // Feedback to client
    res.json(colors.rows);
};
exports.default = {
    color_list
};
