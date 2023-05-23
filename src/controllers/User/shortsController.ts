import { Response, Request } from "express";
import asyncHandler from "express-async-handler";
import shortModel from "../../models/shortModel";

export default {
  //@desc Upload Shorts
  //@route POST /api/shorts/
  //@access private
  uploadShorts: asyncHandler(async (req: Request, res: Response) => {
    const shorts = req.body;
    const newShort = new shortModel(shorts);
    await newShort.save();
    res.status(201).json({ status: true, message: "Short added successfully" });
  }),
  //@desc Get all shorts
  //@route GET /api/shorts/
  //@access private
  getAllShorts: asyncHandler(async (req: Request, res: Response) => {
    const allShorts = await shortModel
      .find()
      .populate("userId")
      .sort({ createdAt: -1 });
    res.status(200).json(allShorts);
  }),
};
