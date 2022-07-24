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
const bcrypt_1 = require("bcrypt");
const prismaClient_1 = __importDefault(require("../prisma/prismaClient"));
const custom_error_1 = __importDefault(require("../errors/custom.error"));
class CreateCustomerService {
    execute({ name, email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const customerExists = yield prismaClient_1.default.customer.findFirst({
                where: { email },
            });
            if (customerExists) {
                throw new custom_error_1.default('Customer already exists', 409);
            }
            const hashedPassword = yield (0, bcrypt_1.hash)(password, 8);
            const customer = yield prismaClient_1.default.customer.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                },
            });
            return customer;
        });
    }
}
exports.default = new CreateCustomerService();
