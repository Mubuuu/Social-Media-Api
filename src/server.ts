import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./config/connection";

// importing routes
import userRouter from "./routes/userRouter";
import adminRouter from "./routes/adminRouter";
import chatRouter from "./routes/chatRouter";
import messageRouter from "./routes/messageRouter";

connectDB;
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Access",],
  })
);

app.use("/", userRouter);
app.use("/chat/", chatRouter);
app.use("/admin", adminRouter);
app.use("/message/", messageRouter);

const port = process.env.PORT || 5000;

// socket io
const io = require("socket.io")(8800, { cors: { origin: "*" } });

let activeUsers: any[] = [];

io.on("connection", (socket: any) => {
  // add new user
  socket.on("new-user-add", (newUserId: string) => {
    // if user not added previously
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({
        userId: newUserId,
        socketId: socket.id,
      });
    }

    console.log("connected users", activeUsers);

    io.emit("get-users", activeUsers);
  });

  //send message
  socket.on("send-message", (data:any) => {
    const { receiverId }= data
    const user = activeUsers.find((user)=>user.userId === receiverId)
    console.log("sending from socket from :",receiverId);
    console.log("Data",data);
    if(user){
      io.to(user.socketId).emit("receive-message",data)
    }
  });

  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log("user disconnected", activeUsers);
    io.emit("get-users", activeUsers);
  });
});

app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
