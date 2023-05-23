"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messageController_1 = require("../controllers/User/messageController");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
router.post("/", authMiddleware_1.default, messageController_1.addMessage);
router.get("/:chatId", authMiddleware_1.default, messageController_1.getMessages);
exports.default = router;
