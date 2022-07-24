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
class InvestmentSellService {
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
            const buyOrder = yield prismaClient_1.default.order.findFirst({
                where: {
                    stockId: stock.id,
                    action: 'BUY',
                    status: 'OPEN',
                    price: {
                        lte: price,
                    },
                },
            });
            const sellerCustomerStock = yield prismaClient_1.default.customerStock.findFirst({
                where: {
                    customerId,
                    stock: {
                        symbol,
                    },
                },
            });
            console.log({ sellerCustomerStock });
            if (!sellerCustomerStock) {
                throw new custom_error_1.default('You do not have this stock', 404);
            }
            if (buyOrder) {
                if (Number(buyOrder.quantity) > Number(sellerCustomerStock.quantity)) {
                    throw new custom_error_1.default("You don't have enough stocks", 400);
                }
                const buyerCustomerStock = yield prismaClient_1.default.customerStock.findFirst({
                    where: {
                        customerId: buyOrder.customerId,
                        stockId: stock.id,
                    },
                });
                if (!buyerCustomerStock) {
                    throw new custom_error_1.default('Buyer does not have this stock', 404);
                }
                const sellOrder = yield prismaClient_1.default.$transaction([
                    prismaClient_1.default.order.update({
                        where: {
                            id: buyOrder.id,
                        },
                        data: {
                            status: 'CLOSED',
                        },
                    }),
                    prismaClient_1.default.customer.update({
                        where: {
                            id: customerId,
                        },
                        data: {
                            balance: {
                                increment: Number(buyOrder.price) * quantity,
                            },
                        },
                    }),
                    prismaClient_1.default.customerStock.update({
                        where: {
                            id: sellerCustomerStock.id,
                        },
                        data: {
                            quantity: {
                                decrement: quantity,
                            },
                        },
                    }),
                    prismaClient_1.default.customerStock.update({
                        where: {
                            id: buyerCustomerStock.id,
                        },
                        data: {
                            quantity: {
                                increment: quantity,
                            },
                        },
                    }),
                    prismaClient_1.default.customer.update({
                        where: {
                            id: buyOrder.customerId,
                        },
                        data: {
                            balance: {
                                decrement: Number(buyOrder.price) * quantity,
                            },
                        },
                    }),
                ]);
                return sellOrder;
            }
            else {
                const sellOrder = yield prismaClient_1.default.order.create({
                    data: {
                        customerId,
                        stockId: stock.id,
                        action,
                        status: 'OPEN',
                        quantity,
                        price,
                    },
                });
                return sellOrder;
            }
        });
    }
}
exports.default = new InvestmentSellService();
