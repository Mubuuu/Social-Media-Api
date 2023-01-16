import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./config/connection";
import userRouter from "./routes/userRouter";
import adminRouter from "./routes/adminRouter";

connectDB;
const app: Application = express()


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser())
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Access"],
  })
);

app.use("/", userRouter);
app.use("/admin", adminRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
