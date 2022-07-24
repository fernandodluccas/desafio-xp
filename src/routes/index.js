"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_routes_1 = __importDefault(require("./authenticate.routes"));
const customers_routes_1 = __importDefault(require("./customers.routes"));
const accounts_routes_1 = __importDefault(require("./accounts.routes"));
const assets_routes_1 = __importDefault(require("./assets.routes"));
const investments_routes_1 = __importDefault(require("./investments.routes"));
const routes = (0, express_1.Router)();
routes.use('/customers', customers_routes_1.default);
routes.use('/authenticate', authenticate_routes_1.default);
routes.use('/accounts', accounts_routes_1.default);
routes.use('/assets', assets_routes_1.default);
routes.use('/investments', investments_routes_1.default);
exports.default = routes;
