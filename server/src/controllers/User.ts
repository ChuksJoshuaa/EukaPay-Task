import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import User from "../models/User";
dotenv.config();

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({
          status: StatusCodes.BAD_REQUEST,
          message: "Please provide email and password",
        });
    }

    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({
          message: "User does not exist",
          status: StatusCodes.NOT_FOUND,
        });
    }

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Invalid Credentials",
        status: StatusCodes.BAD_REQUEST,
      });
    }
    const token = jwt.sign(
      {
        email: oldUser.email,
        password: oldUser.password,
        id: oldUser._id,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: process.env.JWT_LIFETIME,
      }
    );
    return res.status(StatusCodes.OK).json({ result: oldUser, token });
  } catch (error) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: error.message, status: error.status });
  }
};

export const signup = async (req: Request, res: Response) => {
  const { email, firstName, lastName, password } = req.body;

  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User already exist", status: StatusCodes.NOT_FOUND });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.JWT_SECRET as string,
      { expiresIn: process.env.JWT_LIFETIME }
    );

    return res.status(StatusCodes.OK).json({ result, token });
  } catch (error) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: error.message, status: error.status });
  }
};
