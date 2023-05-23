import { Response, Request, response } from "express";
import asyncHandler from "express-async-handler";
import chatModel from "../../models/chatModel";

//@desc Create Message
//@route POST /api/chat/
//@access private
export const createChat = asyncHandler(async (req: Request, res: Response) => {
  const newChat = new chatModel({
    members: [req.body.senderId, req.body.receiverId],
  });
  const result = await newChat.save();
  res.status(200).json(result);
});
//@desc Get single chat
//@route GET /api/chat/:userId
//@access private
export const userChats = asyncHandler(async (req: Request, res: Response) => {
  const chat = await chatModel.find({
    members: { $in: [req.params.userId] },
  });
  res.status(200).json(chat);
});
//@desc Find chat
//@route GET /api/chat/find/:fistId/:secondId
//@access private
export const findChat = asyncHandler(async (req: Request, res: Response) => {
  const chat = await chatModel.findOne({
    members: { $all: [req.params.fistId, req.params.secondId] },
  });
  res.status(200).json(chat);
});
