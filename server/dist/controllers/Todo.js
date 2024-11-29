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
exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.getAllUserTodo = exports.getAllTodos = void 0;
const Todo_1 = __importDefault(require("@models/Todo"));
const http_status_codes_1 = require("http-status-codes");
const getAllTodos = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield Todo_1.default.find({}).sort({ _id: -1 });
        res.status(http_status_codes_1.StatusCodes.OK).json({ data: todos, count: todos.length });
    }
    catch (error) {
        res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ message: "No todo found", error: error.message });
    }
});
exports.getAllTodos = getAllTodos;
const getAllUserTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ message: "User not found", status: http_status_codes_1.StatusCodes.NOT_FOUND });
        }
        else {
            const todos = yield Todo_1.default.find({ createdBy: userId }).sort({ _id: -1 });
            res.status(http_status_codes_1.StatusCodes.OK).json({ todos, count: todos.length });
        }
    }
    catch (error) {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "An error occurred", error: error.message });
    }
});
exports.getAllUserTodo = getAllUserTodo;
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const todo = req.body;
    const { title, status, dueDate } = todo;
    const userId = (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.userId;
    try {
        if (!title || !status || !dueDate) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                message: "All fields are required",
                status: http_status_codes_1.StatusCodes.BAD_REQUEST,
            });
        }
        else if (!userId) {
            res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ message: "User not found", status: http_status_codes_1.StatusCodes.NOT_FOUND });
        }
        else {
            const newTodo = new Todo_1.default(Object.assign(Object.assign({}, todo), { createdBy: userId, createdAt: new Date().toISOString() }));
            yield newTodo.save();
            res.status(http_status_codes_1.StatusCodes.CREATED).json({ newTodo });
        }
    }
    catch (error) {
        res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ message: error.message, status: error.status });
    }
});
exports.createTodo = createTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const { id } = req.params;
    const todoUpdates = req.body;
    const { title, status, dueDate } = todoUpdates;
    const userId = (_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c.userId;
    try {
        if (!userId) {
            res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ message: "User not found", status: http_status_codes_1.StatusCodes.NOT_FOUND });
        }
        else {
            const todo = yield Todo_1.default.findById(id);
            if (!todo) {
                res
                    .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                    .json({ message: "Todo not found", status: http_status_codes_1.StatusCodes.NOT_FOUND });
            }
            else if (((_d = todo === null || todo === void 0 ? void 0 : todo.createdBy) === null || _d === void 0 ? void 0 : _d.toString()) !== (userId === null || userId === void 0 ? void 0 : userId.toString())) {
                res.status(http_status_codes_1.StatusCodes.FORBIDDEN).json({
                    message: "You are not authorized to update this todo",
                    status: http_status_codes_1.StatusCodes.FORBIDDEN,
                });
            }
            else if (!title || !status || !dueDate) {
                res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                    message: "All fields are required",
                    status: http_status_codes_1.StatusCodes.BAD_REQUEST,
                });
            }
            else {
                const updatedTodo = yield Todo_1.default.findByIdAndUpdate(id, Object.assign(Object.assign({}, todoUpdates), { updatedBy: userId, updatedAt: new Date().toISOString() }), { new: true });
                res.status(http_status_codes_1.StatusCodes.OK).json({ updatedTodo });
            }
        }
    }
    catch (error) {
        res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ message: error.message, status: error.status });
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f;
    const { id } = req.params;
    const userId = (_e = req === null || req === void 0 ? void 0 : req.user) === null || _e === void 0 ? void 0 : _e.userId;
    try {
        if (!userId) {
            res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ message: "User not found", status: http_status_codes_1.StatusCodes.NOT_FOUND });
        }
        else {
            const todo = yield Todo_1.default.findById(id);
            if (!todo) {
                res
                    .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                    .json({ message: "Todo not found", status: http_status_codes_1.StatusCodes.NOT_FOUND });
            }
            else if (((_f = todo === null || todo === void 0 ? void 0 : todo.createdBy) === null || _f === void 0 ? void 0 : _f.toString()) !== (userId === null || userId === void 0 ? void 0 : userId.toString())) {
                res.status(http_status_codes_1.StatusCodes.FORBIDDEN).json({
                    message: "You are not authorized to delete this todo",
                    status: http_status_codes_1.StatusCodes.FORBIDDEN,
                });
            }
            else {
                const deletedTodo = yield Todo_1.default.findByIdAndDelete(id);
                res
                    .status(http_status_codes_1.StatusCodes.OK)
                    .json({ message: "Todo deleted successfully", id: deletedTodo === null || deletedTodo === void 0 ? void 0 : deletedTodo._id });
            }
        }
    }
    catch (error) {
        res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ message: error.message, status: error.status });
    }
});
exports.deleteTodo = deleteTodo;
//# sourceMappingURL=Todo.js.map