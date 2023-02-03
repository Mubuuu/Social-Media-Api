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
// app.use(
//   cors(
//   //   {
//   //   origin: ["*"],
//   //   methods: ["GET", "POST","PUT","DELETE","PATCH"],
//   //   credentials: true,
//   //   allowedHeaders: ["Content-Type", "Access"],
//   // }
//   )
// );
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'https://connect.techmart.tech/ , https://www.connect.techmart.tech/');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Pass to next layer of middleware
  next();
});

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
