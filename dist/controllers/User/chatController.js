"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findChat = exports.userChats = exports.createChat = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const chatModel_1 = __importDefault(require("../../models/chatModel"));
//@desc Create Message
//@route POST /api/chat/
//@access private
exports.createChat = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newChat = new chatModel_1.default({
        members: [req.body.senderId, req.body.receiverId],
    });
    const result = yield newChat.save();
    res.status(200).json(result);
}));
//@desc Get single chat
//@route GET /api/chat/:userId
//@access private
exports.userChats = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const chat = yield chatModel_1.default.find({
        members: { $in: [req.params.userId] },
    });
    res.status(200).json(chat);
}));
//@desc Find chat
//@route GET /api/chat/find/:fistId/:secondId
//@access private
exports.findChat = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const chat = yield chatModel_1.default.findOne({
        members: { $all: [req.params.fistId, req.params.secondId] },
    });
    res.status(200).json(chat);
}));
