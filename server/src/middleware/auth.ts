import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import HttpException from "../exceptions/httpExceptions";
dotenv.config();

interface JwtPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: { userId: string; email: string; }
    }
  }
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
   const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new HttpException(StatusCodes.NOT_FOUND, "Authenticated invalid");
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = { userId: payload?.id, email: payload?.email }
    next();
  } catch (error) {
    throw new HttpException(StatusCodes.NOT_FOUND, "Authenticated invalid");
  }
};


export default auth;

