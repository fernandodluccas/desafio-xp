"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const custom_error_1 = __importDefault(require("./custom.error"));
const errorHandler = (err, req, res, _next) => {
    if (err instanceof custom_error_1.default) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message });
};
exports.default = errorHandler;
