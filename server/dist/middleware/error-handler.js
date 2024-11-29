"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpExceptions_1 = __importDefault(require("@exceptions/httpExceptions"));
const http_status_codes_1 = require("http-status-codes");
const errorHandlerMiddleware = (err, _, res) => {
    if (err instanceof httpExceptions_1.default) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    return res
        .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong, please try again" });
};
exports.default = errorHandlerMiddleware;
//# sourceMappingURL=error-handler.js.map