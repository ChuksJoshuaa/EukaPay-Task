import { createTodo, deleteTodo, getAllTodos, getAllUserTodo, getSingleUserTodo, updateTodo } from "@controllers/Todo";
import auth from "@middleware/auth";
import express from "express";

const router = express();

router.post("/create", auth, createTodo);
router.delete("/delete/:id", auth, deleteTodo);
router.patch("/update/:id", auth, updateTodo);
router.get("/user", auth, getAllUserTodo);
router.get("/user/:id", auth, getSingleUserTodo);
router.get("/", getAllTodos);

export default router;
