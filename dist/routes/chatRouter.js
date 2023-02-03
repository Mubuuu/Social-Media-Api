"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chatController_1 = require("../controllers/User/chatController");
const router = express_1.default.Router();
router.post("/", chatController_1.createChat);
router.get("/:userId", chatController_1.userChats);
router.get("/find/:fistId/:secondId", chatController_1.findChat);
exports.default = router;
