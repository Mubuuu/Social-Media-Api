"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connection_1 = __importDefault(require("./config/connection"));
// import routes
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const postRouter_1 = __importDefault(require("./routes/postRouter"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const shortsRouter_1 = __importDefault(require("./routes/shortsRouter"));
const followRouter_1 = __importDefault(require("./routes/followRouter"));
const chatRouter_1 = __importDefault(require("./routes/chatRouter"));
const messageRouter_1 = __importDefault(require("./routes/messageRouter"));
const adminRouter_1 = __importDefault(require("./routes/adminRouter"));
connection_1.default;
const app = (0, express_1.default)();
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // res.setHeader('Access-Control-Allow-Origin', 'https://www.connect.techmart.tech');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Pass to next layer of middleware
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/api/auth", authRouter_1.default);
app.use("/api/user", userRouter_1.default);
app.use("/api/post", postRouter_1.default);
app.use("/api/follow", followRouter_1.default);
app.use("/api/shorts", shortsRouter_1.default);
app.use("/api/chat", chatRouter_1.default);
app.use("/api/message", messageRouter_1.default);
app.use("/api/admin", adminRouter_1.default);
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server started at port ${port}`);
});
