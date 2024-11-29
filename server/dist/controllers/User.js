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
exports.signup = exports.signin = void 0;
const User_1 = __importDefault(require("@models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({
                status: http_status_codes_1.StatusCodes.BAD_REQUEST,
                message: "Please provide email and password",
            });
        }
        const oldUser = yield User_1.default.findOne({ email });
        if (!oldUser) {
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({
                message: "User does not exist",
                status: http_status_codes_1.StatusCodes.NOT_FOUND,
            });
        }
        const isPasswordCorrect = yield bcryptjs_1.default.compare(password, oldUser.password);
        if (!isPasswordCorrect) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                message: "Invalid Credentials",
                status: http_status_codes_1.StatusCodes.BAD_REQUEST,
            });
        }
        const token = jsonwebtoken_1.default.sign({
            email: oldUser.email,
            password: oldUser.password,
            id: oldUser._id,
        }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_LIFETIME,
        });
        return res.status(http_status_codes_1.StatusCodes.OK).json({ result: oldUser, token });
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.NOT_FOUND)
            .json({ message: error.message, status: error.status });
    }
});
exports.signin = signin;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, firstName, lastName, password } = req.body;
    try {
        const oldUser = yield User_1.default.findOne({ email });
        if (oldUser) {
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ message: "User already exist", status: http_status_codes_1.StatusCodes.NOT_FOUND });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
        const result = yield User_1.default.create({
            email,
            password: hashedPassword,
            firstName,
            lastName,
        });
        const token = jsonwebtoken_1.default.sign({ email: result.email, id: result._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME });
        return res.status(http_status_codes_1.StatusCodes.OK).json({ result, token });
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.NOT_FOUND)
            .json({ message: error.message, status: error.status });
    }
});
exports.signup = signup;
//# sourceMappingURL=User.js.map