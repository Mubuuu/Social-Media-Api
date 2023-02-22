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
const qrcode_1 = __importDefault(require("qrcode"));
const userModel_1 = __importDefault(require("../../models/userModel"));
const userModel_2 = __importDefault(require("../../models/userModel"));
const mongoose_1 = __importDefault(require("mongoose"));
exports.default = {
    getUserDetails: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.params.id;
        const user = yield userModel_1.default.findById(userId);
        if (user) {
            res.status(200).json(user);
        }
    }),
    getAllUsers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield userModel_2.default.find();
            res.status(200).json({ users });
        }
        catch (error) {
            res.json(error);
        }
    }),
    follow: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { currId, userId } = req.body;
            const user = yield userModel_2.default.findById(userId);
            const currUser = yield userModel_2.default.findById(currId);
            if (currUser === null || currUser === void 0 ? void 0 : currUser.following.includes(userId)) {
                const resp = yield userModel_2.default.updateOne({ _id: currId }, {
                    $pull: {
                        following: new mongoose_1.default.Types.ObjectId(userId),
                    },
                });
                const respo = yield userModel_2.default.updateOne({ _id: userId }, {
                    $pull: {
                        followers: new mongoose_1.default.Types.ObjectId(currId),
                    },
                });
                res.status(201).json({ status: false, message: "follow validated" });
            }
            else {
                const resp = yield userModel_2.default.updateOne({ _id: currId }, {
                    $push: {
                        following: new mongoose_1.default.Types.ObjectId(userId),
                    },
                });
                const respo = yield userModel_2.default.updateOne({ _id: userId }, {
                    $push: {
                        followers: new mongoose_1.default.Types.ObjectId(currId),
                    },
                });
                res.status(201).json({ status: true, message: "follow validated" });
            }
        }
        catch (error) {
            res.json(error);
        }
    }),
    getFollowers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.params.id;
            const data = yield userModel_2.default.aggregate([
                {
                    $match: {
                        _id: new mongoose_1.default.Types.ObjectId(userId),
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
        }
        catch (error) {
            res.json(error);
        }
    }),
    getFollowings: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.params.id;
            const data = yield userModel_2.default.aggregate([
                {
                    $match: {
                        _id: new mongoose_1.default.Types.ObjectId(userId),
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
        }
        catch (error) {
            res.json(error);
        }
    }),
    getLink: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { url } = req.body;
            qrcode_1.default.toDataURL(url, (err, link) => {
                if (err)
                    console.log(err, "error");
                res.status(200).json(link);
            });
        }
        catch (error) { }
    }),
    editProfile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId, profile_img, cover_img, username, dob, bio, place, relationship, } = req.body;
            const response = yield userModel_2.default.findByIdAndUpdate(userId, {
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
        }
        catch (error) {
            res.json(error);
        }
    }),
    searchUsers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { value } = req.body;
        try {
            const users = yield userModel_2.default.find({ "username": new RegExp(value, "i") });
            res.status(201).json(users.slice(0, 10));
        }
        catch (error) {
            res.json(error);
        }
    }),
};
