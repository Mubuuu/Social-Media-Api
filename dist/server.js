"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("./config/connection"));
// import routes
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const adminRouter_1 = __importDefault(require("./routes/adminRouter"));
const chatRouter_1 = __importDefault(require("./routes/chatRouter"));
const messageRouter_1 = __importDefault(require("./routes/messageRouter"));
connection_1.default;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.options('*', (0, cors_1.default)());
// app.use(
//   cors({
//     origin: ["https://connect.techmart.tech"],
//     methods: ["GET", "POST"],
//     credentials: true,
//     allowedHeaders: ["Content-Type", "Access",],
//   })
//   );
app.use((0, cors_1.default)());
app.use("/", userRouter_1.default);
app.use("/chat/", chatRouter_1.default);
app.use("/admin", adminRouter_1.default);
app.use("/message/", messageRouter_1.default);
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server started at port ${port}`);
});
