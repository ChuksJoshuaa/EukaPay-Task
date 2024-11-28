import mongoose, { ConnectOptions } from "mongoose";

export const connectDB = async (url: string) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions);
};

export const configDb = () => {
  return mongoose.set("strictQuery", true);
};