"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const investment_buy_controller_1 = __importDefault(require("../controllers/investment.buy.controller"));
const investment_sell_controller_1 = __importDefault(require("../controllers/investment.sell.controller"));
const investmentsRoutes = (0, express_1.Router)();
investmentsRoutes.post('/buy', investment_buy_controller_1.default.handle);
investmentsRoutes.post('/sell', investment_sell_controller_1.default.handle);
exports.default = investmentsRoutes;
