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
class InvestmentBuyService {
    execute({ customerId, symbol, action, quantity, price }) {
        return __awaiter(this, void 0, void 0, function* () {
            const stock = yield prismaClient_1.default.stock.findFirst({
                where: { symbol },
            });
            if (!stock) {
                throw new custom_error_1.default('Stock does not exist', 404);
            }
            const customer = yield prismaClient_1.default.customer.findFirst({
                where: { id: customerId },
            });
            if (!customer) {
                throw new custom_error_1.default('Customer does not exist', 404);
            }
            const sellOrder = yield prismaClient_1.default.order.findFirst({
                where: {
                    stockId: stock.id,
                    action: 'SELL',
                    status: 'OPEN',
                    price: {
                        lte: price,
                    },
                },
            });
            if (sellOrder) {
                const totalValue = Number(sellOrder.price) * quantity > Number(customer.balance);
                if (Number(totalValue) > Number(customer.balance)) {
                    throw new custom_error_1.default("You don't have enough balance", 400);
                }
                const buyercustomerStock = yield prismaClient_1.default.customerStock.findFirst({
                    where: {
                        customerId,
                        stockId: stock.id,
                    },
                });
                const sellercustomerStock = yield prismaClient_1.default.customerStock.findFirst({
                    where: {
                        customerId: sellOrder.customerId,
                        stockId: stock.id,
                    },
                });
                if (!sellercustomerStock) {
                    throw new custom_error_1.default('Seller does not have this stock', 404);
                }
                const buyOrder = yield prismaClient_1.default.$transaction([
                    prismaClient_1.default.order.update({
                        where: { id: sellOrder.id },
                        data: {
                            status: 'CLOSED',
                        },
                    }),
                    prismaClient_1.default.customer.update({
                        where: { id: sellOrder.customerId },
                        data: {
                            balance: {
                                increment: Number(sellOrder.price) * quantity,
                            },
                        },
                    }),
                    prismaClient_1.default.customerStock.update({
                        where: {
                            id: sellercustomerStock.id,
                        },
                        data: {
                            quantity: {
                                decrement: sellOrder.quantity,
                            },
                        },
                    }),
                    buyercustomerStock
                        ? prismaClient_1.default.customerStock.update({
                            where: {
                                id: buyercustomerStock.id,
                            },
                            data: {
                                quantity: {
                                    increment: sellOrder.quantity,
                                },
                            },
                        })
                        : prismaClient_1.default.customerStock.create({
                            data: {
                                customerId,
                                stockId: stock.id,
                                quantity: sellOrder.quantity,
                                price: sellOrder.price,
                            },
                        }),
                    prismaClient_1.default.customer.update({
                        where: { id: customerId },
                        data: {
                            balance: {
                                decrement: Number(sellOrder.price) * quantity,
                            },
                        },
                    }),
                ]);
                return buyOrder;
            }
            else {
                const buyOrder = yield prismaClient_1.default.order.create({
                    data: {
                        customerId,
                        stockId: stock.id,
                        action,
                        status: 'OPEN',
                        quantity,
                        price,
                    },
                });
                return buyOrder;
            }
        });
    }
}
exports.default = new InvestmentBuyService();
