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
exports.getMessages = exports.addMessage = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const messageModel_1 = __importDefault(require("../../models/messageModel"));
//@desc Add Message
//@route POST /api/message/
//@access private
exports.addMessage = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId, senderId, text } = req.body;
    const message = new messageModel_1.default({
        chatId,
        senderId,
        text,
    });
    const result = yield message.save();
    res.status(201).json(result);
}));
//@desc Get Messages
//@route GET /api/message/:id
//@access private
exports.getMessages = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId } = req.params;
    const result = yield messageModel_1.default.find({ chatId });
    res.status(201).json(result);
}));
