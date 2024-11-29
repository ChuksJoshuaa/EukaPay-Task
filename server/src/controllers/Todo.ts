import { UserRequest } from "@interface/user";
import Todo from "@models/Todo";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const getAllTodos = async (_: Request, res: Response) => {
  try {
    const todos = await Todo.find({}).sort({ _id: -1 });
    res.status(StatusCodes.OK).json({ data: todos, count: todos.length });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "No todo found", error: error.message });
  }
};

export const getAllUserTodo = async (req: UserRequest, res: Response) => {
  try {
    const userId = req?.user?.userId;
    if (!userId) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found", status: StatusCodes.NOT_FOUND });
    } else {
      const todos = await Todo.find({ createdBy: userId }).sort({ _id: -1 });
      res.status(StatusCodes.OK).json({ todos, count: todos.length });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "An error occurred", error: error.message });
  }
};

export const createTodo = async (req: UserRequest, res: Response) => {
  const todo = req.body;
  const { title, status, dueDate } = todo;
  const userId = req?.user?.userId;
  try {
    if (!title || !status || !dueDate) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "All fields are required",
        status: StatusCodes.BAD_REQUEST,
      });
    } else if (!userId) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found", status: StatusCodes.NOT_FOUND });
    } else {
      const newTodo = new Todo({
        ...todo,
        createdBy: userId,
        createdAt: new Date().toISOString(),
      });

      await newTodo.save();
      res.status(StatusCodes.CREATED).json({ newTodo });
    }
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: error.message, status: error.status });
  }
};

export const updateTodo = async (req: UserRequest, res: Response) => {
  const { id } = req.params;
  const todoUpdates = req.body;
  const { title, status, dueDate } = todoUpdates;
  const userId = req?.user?.userId;

  try {
    if (!userId) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found", status: StatusCodes.NOT_FOUND });
    } else {
      const todo = await Todo.findById(id);
      if (!todo) {
        res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "Todo not found", status: StatusCodes.NOT_FOUND });
      } else if (todo?.createdBy?.toString() !== userId?.toString()) {
        res.status(StatusCodes.FORBIDDEN).json({
          message: "You are not authorized to update this todo",
          status: StatusCodes.FORBIDDEN,
        });
      } else if (!title || !status || !dueDate) {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: "All fields are required",
          status: StatusCodes.BAD_REQUEST,
        });
      } else {
        const updatedTodo = await Todo.findByIdAndUpdate(
          id,
          {
            ...todoUpdates,
            updatedBy: userId,
            updatedAt: new Date().toISOString(),
          },
          { new: true }
        );

        res.status(StatusCodes.OK).json({ updatedTodo });
      }
    }
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: error.message, status: error.status });
  }
};

export const deleteTodo = async (req: UserRequest, res: Response) => {
  const { id } = req.params;
  const userId = req?.user?.userId;

  try {
    if (!userId) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found", status: StatusCodes.NOT_FOUND });
    } else {
      const todo = await Todo.findById(id);
      if (!todo) {
        res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "Todo not found", status: StatusCodes.NOT_FOUND });
      } else if (todo?.createdBy?.toString() !== userId?.toString()) {
        res.status(StatusCodes.FORBIDDEN).json({
          message: "You are not authorized to delete this todo",
          status: StatusCodes.FORBIDDEN,
        });
      } else {
        const deletedTodo = await Todo.findByIdAndDelete(id);
        res
          .status(StatusCodes.OK)
          .json({ message: "Todo deleted successfully", id: deletedTodo?._id});
      }
    }
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: error.message, status: error.status });
  }
};
