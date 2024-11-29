import "module-alias/register";

import { connectDB } from "@db/connect";
import errorHandlerMiddleware from "@middleware/error-handler";
import notFound from "@middleware/not-found";
import todoRoutes from "@routes/Todo";
import userRoutes from "@routes/User";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import rateLimiter from "express-rate-limit";
import helmet from "helmet";
dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(helmet());

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);
app.get("/", (_, res) => {
  res.send("Api working perfectly");
});

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/todos", todoRoutes);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI!);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
