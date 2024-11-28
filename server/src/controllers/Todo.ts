import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Todo from "../models/Todo";

export const getAllTodo = async (_: Request, res: Response) => {
  try {
    const todo = await Todo.find({});
    res.status(StatusCodes.OK).json({ data: todo });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "No content found" });
  }
};
