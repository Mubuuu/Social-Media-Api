import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./config/connection";

// import routes
import userRouter from "./routes/userRouter";
import adminRouter from "./routes/adminRouter";
import chatRouter from "./routes/chatRouter";
import messageRouter from "./routes/messageRouter";

connectDB;
const app: Application = express();
app.use(
  cors(
  //   {
  //   origin: ["*"],
  //   methods: ["GET", "POST","PUT","DELETE","PATCH"],
  //   credentials: true,
  //   allowedHeaders: ["Content-Type", "Access"],
  // }
  )
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", userRouter);
app.use("/chat/", chatRouter);
app.use("/admin", adminRouter);
app.use("/message/", messageRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
