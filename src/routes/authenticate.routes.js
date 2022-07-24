"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_customer_controller_1 = __importDefault(require("../controllers/authenticate.customer.controller"));
const authenticate_validate_1 = __importDefault(require("../middlewares/authenticate.validate"));
const authenticateRoutes = (0, express_1.Router)();
authenticateRoutes.post('/', authenticate_validate_1.default, authenticate_customer_controller_1.default.handle);
exports.default = authenticateRoutes;
