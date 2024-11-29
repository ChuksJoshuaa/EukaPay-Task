import dotenv from "dotenv";
import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { UserRequest } from "../types/user";
dotenv.config();

interface JwtPayload {
  id: string;
  email: string;
}

const auth = async (req: UserRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.status(StatusCodes.NOT_FOUND).json({
      message: "Authentication invalid: Please log in to access this resource.",
      status: StatusCodes.NOT_FOUND,
    });
  } else {
    const token = authHeader.split(" ")[1];

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
      req.user = { userId: payload?.id, email: payload?.email };
      next();
    } catch (_) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({
          message: "Authentication invalid: Please log in to access this resource.",
          status: StatusCodes.NOT_FOUND,
        });
    }
  }
};

export default auth;
