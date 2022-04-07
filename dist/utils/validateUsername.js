"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (username) => {
    const regex = /^[^\W\s][\w\-\.]+$/gi;
    return regex.test(username);
};
