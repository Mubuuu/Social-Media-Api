"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../../utils/jwt");
const userModel_2 = __importDefault(require("../../models/userModel"));
exports.default = {
    postRegister: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userVerify = yield userModel_1.default.findOne({
                $or: [{ email: req.body.email }, { mobile: req.body.mobile }],
            });
            if (userVerify) {
                res.status(201).json({
                    status: false,
                    message: "user Already exist",
                });
            }
            else {
                const userData = req.body;
                const salt = yield bcrypt_1.default.genSalt(10);
                userData.password = yield bcrypt_1.default.hash(userData.password, salt);
                userData.active = true;
                const newUser = new userModel_1.default(userData);
                yield newUser.save();
                res.status(201).json({
                    status: true,
                    message: "signup successfully",
                });
            }
        }
        catch (error) {
            res.json(error);
        }
    }),
    googleLogin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userVerify = yield userModel_1.default.findOne({
                email: req.body.email,
            });
            if (userVerify) {
                const token = (0, jwt_1.generateToken)({ id: userVerify._id.toString() }, "30m");
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
            }
            else {
                const userData = req.body;
                userData.active = true;
                const newUser = new userModel_1.default(userData);
                const user = yield newUser.save();
                const token = (0, jwt_1.generateToken)({ id: user._id.toString() }, "30m");
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
        }
        catch (error) { }
    }),
    postLogin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const user = yield userModel_1.default.findOne({ email });
            if (user) {
                if (user.active) {
                    const passwordCheck = yield bcrypt_1.default.compare(password, user.password);
                    if (passwordCheck) {
                        const token = (0, jwt_1.generateToken)({ id: user._id.toString() }, "30m");
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
                    else {
                        res.json({ status: false, message: "invalid password" });
                    }
                }
                else {
                    res.json({ status: false, message: "user have been blocked" });
                }
            }
            else {
                res.json({ status: false, message: "invalid email" });
            }
        }
        catch (error) {
            res.json(error);
        }
    }),
    changePassword: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let { currpassword, newpassword, userId } = req.body;
            const user = yield userModel_2.default.findById(userId);
            if (user) {
                const passwordCheck = yield bcrypt_1.default.compare(currpassword, user.password);
                if (passwordCheck) {
                    const salt = yield bcrypt_1.default.genSalt(10);
                    newpassword = yield bcrypt_1.default.hash(newpassword, salt);
                    const response = yield userModel_2.default.updateOne({ _id: userId }, {
                        $set: {
                            password: newpassword,
                        },
                    });
                    res
                        .status(201)
                        .json({ status: true, message: "Password changed successfully" });
                }
                else {
                    res
                        .status(201)
                        .json({ status: false, message: "Password did not match" });
                }
            }
            else {
                res.status(201).json({ status: false, message: "User not exist" });
            }
        }
        catch (error) {
            res.status(500).json(error);
        }
    }),
};
