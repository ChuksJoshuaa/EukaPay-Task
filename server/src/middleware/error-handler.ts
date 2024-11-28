import { Request, Response } from "express";
import HttpException from "../exceptions/httpExceptions";
import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (
  err: HttpException,
  _: Request,
  res: Response
) => {
  if (err instanceof HttpException) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: "Something went wrong, please try again" });
};

export default errorHandlerMiddleware;