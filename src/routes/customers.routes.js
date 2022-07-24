"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const create_customer_controller_1 = __importDefault(require("../controllers/create.customer.controller"));
const customer_validate_1 = __importDefault(require("../middlewares/customer.validate"));
const customerRoutes = (0, express_1.Router)();
customerRoutes.post('/', customer_validate_1.default, create_customer_controller_1.default.handle);
exports.default = customerRoutes;
