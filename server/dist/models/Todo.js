"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TodoSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: [true, "Please provide title"],
    },
    status: {
        type: String,
        enum: ["Unfinished", "Done"],
        default: "Unfinished",
    },
    createdBy: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
        require: [true, "Please provide user"],
    },
    dueDate: {
        type: Date,
        required: false,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Todo", TodoSchema);
//# sourceMappingURL=Todo.js.map