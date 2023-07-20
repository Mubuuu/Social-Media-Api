import { Response, Request } from "express";
import asyncHandler from "express-async-handler";
import UserModel from "../../models/userModel";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/jwt";
import userModel from "../../models/userModel";
export default {
  //@desc Register User
  //@route POST /api/auth/signup
  //@access public
  postRegister: asyncHandler(async (req: Request, res: Response) => {
    const userVerify = await UserModel.findOne({
      $or: [{ email: req.body.email }, { mobile: req.body.mobile }],
    });
    if (userVerify) {
      res.status(201).json({
        status: false,
        message: "user Already exist",
      });
    } else {
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
  }),
  //@desc Google Login
  //@route POST /api/auth/google-login
  //@access public
  googleLogin: asyncHandler(async (req: Request, res: Response) => {
    const userVerify = await UserModel.findOne({
      email: req.body.email,
    });
    if (userVerify) {
      const token = generateToken({ id: userVerify._id.toString() }, "30m");
      res.status(201).json({
        token,
        status: true,
        message: "welcome to connect with",
        userId: userVerify._id,
        username: userVerify.username,
        email: userVerify.email,
        dob: userVerify.dob,
        mobile: userVerify.mobile,
        place: userVerify.place,
        bio: userVerify.bio,
        relationship: userVerify.relationship,
        profile_img: userVerify.profile_img,
        cover_img: userVerify.cover_img,
        verified: userVerify.verified,
        followers: userVerify.followers,
        following: userVerify.following,
      });
    } else {
      const userData = req.body;
      userData.active = true;
      const newUser = new UserModel(userData);
      const user = await newUser.save();
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
    }
  }),
  //@desc Login User
  //@route POST /api/auth/login
  //@access public
  postLogin: asyncHandler(async (req: Request, res: Response) => {
    const { email, password }: { email: string; password: string } = req.body;
    console.log(email,1232)
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
  }),
  //@desc Change Password
  //@route POST /api/users/change-password
  //@access private
  changePassword: asyncHandler(async (req: Request, res: Response) => {
    let { currpassword, newpassword, userId } = req.body;
    const user = await userModel.findById(userId);
    if (user) {
      const passwordCheck = await bcrypt.compare(currpassword, user.password);
      if (passwordCheck) {
        const salt = await bcrypt.genSalt(10);
        newpassword = await bcrypt.hash(newpassword, salt);
        const response = await userModel.updateOne(
          { _id: userId },
          {
            $set: {
              password: newpassword,
            },
          }
        );
        res
          .status(201)
          .json({ status: true, message: "Password changed successfully" });
      } else {
        res
          .status(403)
          .json({ status: false, message: "Password did not match" });
      }
    } else {
      res.status(404).json({ status: false, message: "User not exist" });
    }
  }),
};
