"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const password_validator_1 = __importDefault(require("password-validator"));
exports.default = (password) => {
    const schema = new password_validator_1.default();
    schema
        .is().min(6) // Minimum length 8
        .is().max(20) // Maximum length 20
        .has().not().spaces() // Should not have spaces
        .has().not(/[а-я]/gi); // Has no cyrillic symbols
    const isValid = schema.validate(password);
    // if (!isValid) console.log(schema.validate(password));
    return isValid;
};
