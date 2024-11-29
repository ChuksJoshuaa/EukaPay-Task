"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Todo_1 = require("@controllers/Todo");
const auth_1 = __importDefault(require("@middleware/auth"));
const router = (0, express_1.default)();
router.post("/create", auth_1.default, Todo_1.createTodo);
router.delete("/delete/:id", auth_1.default, Todo_1.deleteTodo);
router.patch("/update/:id", auth_1.default, Todo_1.updateTodo);
router.get("/user", auth_1.default, Todo_1.getAllUserTodo);
router.get("/", Todo_1.getAllTodos);
exports.default = router;
//# sourceMappingURL=Todo.js.map