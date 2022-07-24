"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asset_controller_1 = __importDefault(require("../controllers/asset.controller"));
const assets_validate_1 = __importDefault(require("../middlewares/assets.validate"));
const assetsRoutes = (0, express_1.Router)();
assetsRoutes.get('/:id', assets_validate_1.default, asset_controller_1.default.handle);
exports.default = assetsRoutes;
