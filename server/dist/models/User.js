"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validations_1 = require("@utils/validations");
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: [true, "Please provide first name"],
        maxLength: 50,
        minLength: 1,
    },
    lastName: {
        type: String,
        required: [true, "Please provide last name"],
        maxLength: 50,
        minLength: 1,
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        validate: (0, validations_1.getEmailValidator)(),
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minLength: [8, "Password must be at least 8 characters long"],
        validate: (0, validations_1.getPasswordValidators)()
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("User", userSchema);
//# sourceMappingURL=User.js.map