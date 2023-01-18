import { Response, Request, response } from "express";
import messageModel from "../../models/messageModel";

export const addMessage = async (req: Request, res: Response) => {
  const { chatId, senderId, text } = req.body;
  const message = new messageModel({
    chatId,
    senderId,
    text,
  });
  try {
    const result = await message.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getMessages =async (req:Request,res:Response) => {
    const {chatId} = req.params
    try {
        const result  = await messageModel.find({chatId})
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}
