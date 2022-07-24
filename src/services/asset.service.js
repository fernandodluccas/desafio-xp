"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const custom_error_1 = __importDefault(require("../errors/custom.error"));
const prismaClient_1 = __importDefault(require("../prisma/prismaClient"));
const isStockSymbol = (id) => {
    return /^[A-Z0-9]{4}[0-9]{1,2}[F]?$/.test(id);
};
class AssetsService {
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (isStockSymbol(id)) {
                const stock = yield prismaClient_1.default.stock.findFirst({
                    where: {
                        symbol: id,
                    },
                });
                if (!stock) {
                    throw new custom_error_1.default('Stock not found', 404);
                }
                const assets = yield prismaClient_1.default.customerStock.findMany({
                    where: {
                        stockId: stock.id,
                    },
                    include: {
                        stock: true,
                    },
                });
                return assets.map((asset) => ({
                    customerId: asset.customerId,
                    symbol: asset.stock.symbol,
                    quantity: asset.quantity,
                    price: asset.price,
                }));
            }
            else {
                const assets = yield prismaClient_1.default.customerStock.findMany({
                    where: {
                        customerId: id,
                    },
                    include: {
                        stock: true,
                    },
                });
                if (!assets) {
                    throw new custom_error_1.default('Customer not found', 404);
                }
                return assets.map((asset) => ({
                    customerId: asset.customerId,
                    symbol: asset.stock.symbol,
                    quantity: asset.quantity,
                    price: asset.price,
                }));
            }
        });
    }
}
exports.default = new AssetsService();
