import { Response, Request, response } from "express";
import chatModel from "../../models/chatModel";

export const createChat =async (req:Request,res:Response) => {
    try {
        const newChat = new chatModel({
            members:[req.body.senderId,req.body.receiverId]
        })

        const result = await newChat.save()
        res.status(200).json(result)
        
    } catch (error) {
        res.status(500).json(error)
    }
}
export const userChats =async (req:Request,res:Response) => {
    try {
        console.log(req.params);
        
        const chat = await chatModel.find({
            members:{$in:[req.params.userId]}
        })
        res.status(200).json(chat)
    } catch (error) {
        res.status(500).json(error)
    }
}
export const findChat =async (req:Request,res:Response) => {
    try {
        const chat = await chatModel.findOne({
            members:{$all:[req.params.fistId,req.params.secondId]}
        })
        res.status(200).json(chat)
    } catch (error) {
        res.status(500).json(error)
    }
}