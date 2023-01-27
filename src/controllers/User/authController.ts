import { Response, Request } from "express";
import qr from "qrcode";
import UserModel from "../../models/userModel";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/jwt";
import userModel from "../../models/userModel";
import mongoose, { isObjectIdOrHexString } from "mongoose";
export default {
  postRegister: async (req: Request, res: Response) => {
    console.log(req.body, 987987);

    try {
      const userVerify = await UserModel.findOne({
        $or: [{ email: req.body.email }, { mobile: req.body.mobile }],
      });
      if (userVerify) {
        console.log("already ind");

        res.status(401).json({
          status: false,
        });
      } else {
        console.log("new aaan");

        const userData = req.body;
        const salt = await bcrypt.genSalt(10);
        userData.password = await bcrypt.hash(userData.password, salt);

        userData.active = true;
        const newUser = new UserModel(userData);
        await newUser.save();
        res.status(201).json({
          status: true,
          message: "signup successfully",
        });
      }
    } catch (error) {
      console.log(error, "Signup Error");
    }
  },
  postLogin: async (req: Request, res: Response) => {
    try {
      const { email, password }: { email: string; password: string } = req.body;
      const user = await UserModel.findOne({ email });
      if (user) {
        if (user.active) {
          const passwordCheck = await bcrypt.compare(password, user.password);
          if (passwordCheck) {
            const token = generateToken({ id: user._id.toString() }, "30m");
            res.status(201).json({
              token,
              status: true,
              message: "welcome to connect with",
              userId: user._id,
              username: user.username,
              email: user.email,
              dob: user.dob,
              mobile: user.mobile,
              place: user.place,
              bio: user.bio,
              relationship: user.relationship,
              profile_img: user.profile_img,
              cover_img: user.cover_img,
              verified: user.verified,
              followers: user.followers,
              following: user.following,
            });
          } else {
            res.json({ status: false, message: "invalid password" });
          }
        } else {
          res.json({ status: false, message: "user have been blocked" });
        }
      } else {
        res.json({ status: false, message: "invalid email" });
      }
    } catch (error) {}
  },
  getUserDetails: async (req: Request, res: Response) => {
    const userId = req.body.userId;
    console.log(userId, 8585);
    const user = await UserModel.findById(userId);
    if (user) {
      res.status(201).json(user);
    }
  },
  getAllUsers: async (req: Request, res: Response) => {
    try {
      const users = await userModel.find();
      console.log(users, 8787);

      res.status(201).json({ users });
    } catch (error) {
      console.log(error);
    }
  },
  follow: async (req: Request, res: Response) => {
    try {
      const { currId, userId } = req.body;
      console.log(currId, 2222);
      console.log(userId, 1111);

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
      console.log(error);
    }
  },
  getFollowers: async (req: Request, res: Response) => {
    console.log("haaai");

    try {
      console.log(req.body, "njan aan kunjikkannaa");
      const { userId } = req.body;
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
      console.log(data);

      res.status(201).json(data);
    } catch (error) {
      console.log(error);
    }
  },
  getFollowings: async (req: Request, res: Response) => {
    console.log("haaai");

    try {
      console.log(req.body, "njan aan kunjikkannaa");
      const { userId } = req.body;
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
      console.log(data);

      res.status(201).json(data);
    } catch (error) {
      console.log(error);
    }
  },
  getLink: async (req: Request, res: Response) => {
    try {
      const { url } = req.body;
      console.log(url);

      qr.toDataURL(url, (err, link) => {
        if (err) console.log(err, "error");

        res.status(200).json(link);
      });
    } catch (error) {}
  },
  changePassword: async (req: Request, res: Response) => {
    try {
      console.log(req.body, 'chaaange');
      
      let { currpassword, newpassword, userId } = req.body;
      const user = await userModel.findById(userId)
      if(user){
        const passwordCheck = await bcrypt.compare(currpassword, user.password);
        if(passwordCheck){
          const salt = await bcrypt.genSalt(10);
          newpassword = await bcrypt.hash(newpassword, salt);
          const response = await userModel.updateOne(
            { _id: userId },
            {
              $set: {
                password: newpassword
              },
            }
          );
          res.status(201).json({status:true,message:'Password changed successfully'})
        }else{
          res.status(201).json({status:false,message:'Password did not match'})
        }
      }else{
        res.status(201).json({status:false,message:'User not exist'})
      }
      
    } catch (error) {
      res.status(500).json(error)
    }
  },
};
