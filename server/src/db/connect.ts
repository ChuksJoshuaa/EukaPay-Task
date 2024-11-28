import mongoose, { ConnectOptions } from "mongoose";

export const connectDB = async (url: string) => {
  return mongoose.connect(url, {} as ConnectOptions);
};

export const configDb = () => {
  return mongoose.set("strictQuery", true);
};
