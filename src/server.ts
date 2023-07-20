import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./config/connection";

// import routes
import authRouter from "./routes/authRouter";
import postRouter from "./routes/postRouter";
import userRouter from "./routes/userRouter";
import shortsRouter from "./routes/shortsRouter";
import followRouter from "./routes/followRouter";
import chatRouter from "./routes/chatRouter";
import messageRouter from "./routes/messageRouter";
import adminRouter from "./routes/adminRouter";
import errorHandler from "./middleware/errorMiddleware";

connectDB;
const app: Application = express();
// app.use(cors({
//   origin: ['http://localhost:3000'],
//   // origin: ['https://www.connect.techmart.tech'],
//   methods: ['GET', 'POST','PUT','DELETE','HEAD'],
//   credentials: true,
//   exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar']},
//   ))

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader('Access-Control-Allow-Origin', 'https://www.connect.techmart.tech');

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  // Pass to next layer of middleware
  res.setHeader("Access-Control-Allow-Credentials", "true");

  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/follow", followRouter);
app.use("/api/shorts", shortsRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);
app.use("/api/admin", adminRouter);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
