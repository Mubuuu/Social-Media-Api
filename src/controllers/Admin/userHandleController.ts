import { Response, Request } from "express";
import userModel from "../../models/userModel";
export const userBlock = async (req: Request, res: Response) => {
  const { userId } = req.body;
  const user = await userModel.find({ _id: userId });
  try {
    if (user[0].active) {
      await userModel.updateOne(
        { _id: userId },
        {
          active: false,
        }
      );
      res.status(201).json({ status: true, message: "Blocked" });
    } else {
      await userModel.updateOne(
        { _id: userId },
        {
          active: true,
        }
      );
      res.status(201).json({ status: true, message: "unblocked" });
    }
  } catch (error) {
    res.status(500).json(error)
  }
};
