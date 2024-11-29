"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("@controllers/User");
const express_1 = __importDefault(require("express"));
const router = (0, express_1.default)();
router.post("/login", User_1.signin);
router.post("/register", User_1.signup);
exports.default = router;
//# sourceMappingURL=User.js.map