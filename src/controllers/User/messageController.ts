import { Response, Request, response } from "express";
import asyncHandler from "express-async-handler";
import messageModel from "../../models/messageModel";

//@desc Add Message
//@route POST /api/message/
//@access private
export const addMessage = asyncHandler(async (req: Request, res: Response) => {
  const { chatId, senderId, text } = req.body;
  const message = new messageModel({
    chatId,
    senderId,
    text,
  });
  const result = await message.save();
  res.status(201).json(result);
});

//@desc Get Messages
//@route GET /api/message/:id
//@access private
export const getMessages = asyncHandler(async (req: Request, res: Response) => {
  const { chatId } = req.params;
  const result = await messageModel.find({ chatId });
  res.status(201).json(result);
});
