import { timeStamp } from "console";
import { Response, Request } from "express";
import shortModel from "../../models/shortModel";

export default {
  uploadShorts: async (req: Request, res: Response) => {
    const shorts = req.body;
    try {
      const newShort = new shortModel(shorts);
      await newShort.save();
      res
        .status(201)
        .json({ status: true, message: "Short added successfully" });
    } catch (error) {
      res.json(error);
    }
  },
  getAllShorts: async (req: Request, res: Response) => {
    try {
      const allShorts = await shortModel
        .find()
        .populate("userId")
        .sort({ createdAt: -1 });
      res.status(200).json(allShorts);
    } catch (error) {
      res.json(error)
    }
  },
};
