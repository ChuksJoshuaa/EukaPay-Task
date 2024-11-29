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
const dotenv_1 = __importDefault(require("dotenv"));
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            message: "Authentication invalid: Please log in to access this resource.",
            status: http_status_codes_1.StatusCodes.NOT_FOUND,
        });
    }
    else {
        const token = authHeader.split(" ")[1];
        try {
            const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            req.user = { userId: payload === null || payload === void 0 ? void 0 : payload.id, email: payload === null || payload === void 0 ? void 0 : payload.email };
            next();
        }
        catch (_) {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                message: "Authentication invalid: Please log in to access this resource.",
                status: http_status_codes_1.StatusCodes.NOT_FOUND,
            });
        }
    }
});
exports.default = auth;
//# sourceMappingURL=auth.js.map