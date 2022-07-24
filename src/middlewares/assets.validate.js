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
const joi_1 = __importDefault(require("joi"));
const assetSchema = joi_1.default.object({
    id: joi_1.default.alternatives()
        .try(joi_1.default.string().regex(/^[A-Z0-9]{4}[0-9]{1,2}[F]?$/), joi_1.default.string().uuid())
        .required(),
}).required();
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield assetSchema.validateAsync(req.params);
        next();
    }
    catch (err) {
        return res.status(422).json({ message: err.message });
    }
});
