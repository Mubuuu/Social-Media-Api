import { Response, Request } from "express";
import qr from "qrcode";
import UserModel from "../../models/userModel";
import userModel from "../../models/userModel";
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";

export default {
  //@desc Get user details
  //@route GET /api/user/:id
  //@access private
  getUserDetails: asyncHandler(async (req: Request, res: Response) => {
    const userId = req.params.id;
    const user = await UserModel.findById(userId);
    if (user) {
      res.status(200).json(user);
    }
  }),
  //@desc Get all users
  //@route GET /api/user/
  //@access private
  getAllUsers: asyncHandler(async (req: Request, res: Response) => {
    const users = await userModel.find();
    res.status(200).json({ users });
  }),
  //@desc Follow a user
  //@route POST /api/follow/
  //@access private
  follow: asyncHandler(async (req: Request, res: Response) => {
    const { currId, userId } = req.body;
    const currUser = await userModel.findById(currId);
    if (currUser?.following.includes(userId)) {
      await userModel.updateOne(
        { _id: currId },
        {
          $pull: {
            following: new mongoose.Types.ObjectId(userId),
          },
        }
      );
      await userModel.updateOne(
        { _id: userId },
        {
          $pull: {
            followers: new mongoose.Types.ObjectId(currId),
          },
        }
      );
      res.status(201).json({ status: false, message: "follow validated" });
    } else {
      await userModel.updateOne(
        { _id: currId },
        {
          $push: {
            following: new mongoose.Types.ObjectId(userId),
          },
        }
      );
      await userModel.updateOne(
        { _id: userId },
        {
          $push: {
            followers: new mongoose.Types.ObjectId(currId),
          },
        }
      );
      res.status(201).json({ status: true, message: "follow validated" });
    }
  }),
  //@desc Get all followers
  //@route GET /api/follow/followers/:id
  //@access private
  getFollowers: asyncHandler(async (req: Request, res: Response) => {
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
  }),
  //@desc Get all followings
  //@route GET /api/follow/followings/:id
  //@access private
  getFollowings: asyncHandler(async (req: Request, res: Response) => {
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
  }),
  //@desc Generate QR code
  //@route POST /api/user/qrcode
  //@access private
  getLink: asyncHandler(async (req: Request, res: Response) => {
    const { url } = req.body;
    qr.toDataURL(url, (err, link) => {
      if (err) {
        res.status(403);
        throw new Error("Error with Qr code");
      }
      res.status(200).json(link);
    });
  }),
  //@desc Edit user profile
  //@route POST /api/user/profile
  //@access private
  editProfile: asyncHandler(async (req: Request, res: Response) => {
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
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  }),
  //@desc Search Users
  //@route POST /api/user/search-users
  //@access private
  searchUsers: asyncHandler(async (req: Request, res: Response) => {
    const { value } = req.body;
    const users = await userModel.find({ username: new RegExp(value, "i") });
    res.status(201).json(users.slice(0, 10));
  }),
};
