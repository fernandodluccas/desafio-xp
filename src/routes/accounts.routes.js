"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const account_deposit_controller_1 = __importDefault(require("../controllers/account.deposit.controller"));
const account_withdraw_controller_1 = __importDefault(require("../controllers/account.withdraw.controller"));
const account_balance_controller_1 = __importDefault(require("../controllers/account.balance.controller"));
const accountsRoutes = (0, express_1.Router)();
accountsRoutes.post('/deposit', account_deposit_controller_1.default.handle);
accountsRoutes.post('/withdraw', account_withdraw_controller_1.default.handle);
accountsRoutes.get('/:id', account_balance_controller_1.default.handle);
exports.default = accountsRoutes;
