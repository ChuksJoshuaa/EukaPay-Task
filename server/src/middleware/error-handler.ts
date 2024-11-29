import HttpException from "@exceptions/httpExceptions";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (
  err: HttpException,
  _: Request,
  res: Response
) => {
  if (err instanceof HttpException) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: "Something went wrong, please try again" });
};

export default errorHandlerMiddleware;