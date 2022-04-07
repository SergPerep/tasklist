"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.default = (password) => {
    const salt = bcryptjs_1.default.genSaltSync();
    const hash = bcryptjs_1.default.hashSync(password, salt);
    return hash;
};
