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
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const adminRouter_1 = __importDefault(require("./routes/adminRouter"));
const chatRouter_1 = __importDefault(require("./routes/chatRouter"));
const messageRouter_1 = __importDefault(require("./routes/messageRouter"));
connection_1.default;
const app = (0, express_1.default)();
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
    res.setHeader('Access-Control-Allow-Origin', 'https://www.connect.techmart.tech');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Pass to next layer of middleware
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/", userRouter_1.default);
app.use("/chat/", chatRouter_1.default);
app.use("/admin", adminRouter_1.default);
app.use("/message/", messageRouter_1.default);
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`server started at port ${port}`);
});
