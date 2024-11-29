import express from "express";
import { createTodo, getAllUserTodo, getAllTodos, updateTodo, deleteTodo } from "@controllers/Todo";
import auth from "@middleware/auth";

const router = express();

router.post("/create", auth, createTodo);
router.delete("/delete/:id", auth, deleteTodo);
router.patch("/update/:id", auth, updateTodo);
router.get("/user", auth, getAllUserTodo);
router.get("/", getAllTodos);

export default router;
