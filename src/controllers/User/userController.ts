import { Response, Request } from "express";
import qr from "qrcode";
import UserModel from "../../models/userModel";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/jwt";
import userModel from "../../models/userModel";
import mongoose from "mongoose";

export default {
    getUserDetails: async (req: Request, res: Response) => {
        const userId = req.params.id;
        const user = await UserModel.findById(userId);
        if (user) {
          res.status(200).json(user);
        }
      },
      getAllUsers: async (req: Request, res: Response) => {
        try {
          const users = await userModel.find();
          res.status(200).json({ users });
        } catch (error) {
          res.json(error);
        }
      },
      follow: async (req: Request, res: Response) => {
        try {
          const { currId, userId } = req.body;
          const user = await userModel.findById(userId);
          const currUser = await userModel.findById(currId);
          if (currUser?.following.includes(userId)) {
            const resp = await userModel.updateOne(
              { _id: currId },
              {
                $pull: {
                  following: new mongoose.Types.ObjectId(userId),
                },
              }
            );
            const respo = await userModel.updateOne(
              { _id: userId },
              {
                $pull: {
                  followers: new mongoose.Types.ObjectId(currId),
                },
              }
            );
            res.status(201).json({ status: false, message: "follow validated" });
          } else {
            const resp = await userModel.updateOne(
              { _id: currId },
              {
                $push: {
                  following: new mongoose.Types.ObjectId(userId),
                },
              }
            );
            const respo = await userModel.updateOne(
              { _id: userId },
              {
                $push: {
                  followers: new mongoose.Types.ObjectId(currId),
                },
              }
            );
            res.status(201).json({ status: true, message: "follow validated" });
          }
        } catch (error) {
          res.json(error);
        }
      },
      getFollowers: async (req: Request, res: Response) => {
        try {
          const userId = req.params.id;
          const data = await userModel.aggregate([
            {
              $match: {
                _id: new mongoose.Types.ObjectId(userId),
              },
            },
            {
              $project: {
                followers: 1,
              },
            },
            {
              $unwind: {
                path: "$followers",
              },
            },
            {
              $project: {
                _id: 0,
              },
            },
            {
              $lookup: {
                from: "users",
                localField: "followers",
                foreignField: "_id",
                as: "followers",
              },
            },
            {
              $project: {
                followers: { $arrayElemAt: ["$followers", 0] },
              },
            },
          ]);
          res.status(201).json(data);
        } catch (error) {
          res.json(error);
        }
      },
      getFollowings: async (req: Request, res: Response) => {
        try {
          const userId = req.params.id;
          const data = await userModel.aggregate([
            {
              $match: {
                _id: new mongoose.Types.ObjectId(userId),
              },
            },
            {
              $project: {
                following: 1,
              },
            },
            {
              $unwind: {
                path: "$following",
              },
            },
            {
              $project: {
                _id: 0,
              },
            },
            {
              $lookup: {
                from: "users",
                localField: "following",
                foreignField: "_id",
                as: "following",
              },
            },
            {
              $project: {
                following: { $arrayElemAt: ["$following", 0] },
              },
            },
          ]);
          res.status(201).json(data);
        } catch (error) {
          res.json(error);
        }
      },
      getLink: async (req: Request, res: Response) => {
        try {
          const { url } = req.body;
          qr.toDataURL(url, (err, link) => {
            if (err) console.log(err, "error");
            res.status(200).json(link);
          });
        } catch (error) {}
      },
      editProfile: async (req: Request, res: Response) => {
        try {
          const {
            userId,
            profile_img,
            cover_img,
            username,
            dob,
            bio,
            place,
            relationship,
          } = req.body;
          const response = await userModel.findByIdAndUpdate(userId, {
            profile_img: profile_img,
            cover_img: cover_img,
            username: username,
            dob: dob,
            bio: bio,
            place: place,
            relationship: relationship,
          });
          if (response) {
            res
              .status(201)
              .json({ status: true, message: "profile update finished" });
          }
          res.json({ status: false, message: "somethig went wrong" });
        } catch (error) {
          res.json(error);
        }
      },
      searchUsers: async (req: Request, res: Response) => {
        const { value } = req.body;
        try {
          const users = await userModel.find({ "username": new RegExp(value,"i") });
          res.status(201).json(users.slice(0,10))
        } catch (error) {
          res.json(error)
        }
      },
}