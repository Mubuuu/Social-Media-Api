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
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const commentModel_1 = __importDefault(require("../../models/commentModel"));
const postModel_1 = __importDefault(require("../../models/postModel"));
const userModel_1 = __importDefault(require("../../models/userModel"));
exports.default = {
    //@desc Upload Post
    //@route POST /api/post/
    //@access private
    addPost: (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const postData = req.body;
        const newPost = new postModel_1.default(postData);
        yield newPost.save();
        res.status(201).json({ status: true, message: "post added" });
    })),
    //@desc Get all posts of a user
    //@route GET /api/post/:id
    //@access private
    getPosts: (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.params.id;
        const data = yield postModel_1.default.find({ userId });
        if (data.length > 0) {
            res.status(201).json({ data });
        }
        else {
            res.status(404);
            throw new Error("Posts not Found");
        }
    })),
    //@desc Get all Posts
    //@route GET /api/post/
    //@access private
    getAllPosts: (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield postModel_1.default.find().populate("userId");
        res.status(201).json({ data });
    })),
    getAllUserDetails: (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId } = req.body;
        const userData = yield userModel_1.default.findOne({ _id: userId });
        const userPosts = yield postModel_1.default.find({ userId });
        res.status(201).json({ userData, userPosts });
    })),
    //@desc Add Comment
    //@route POST /api/post/comment
    //@access private
    addComment: (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId, postId, comment } = req.body;
        const comments = comment.trim();
        const user = yield userModel_1.default.findOne({ _id: userId });
        const result = { username: user === null || user === void 0 ? void 0 : user.username, comments };
        const postExist = yield commentModel_1.default.findOne({ postId });
        if (comments.length > 0) {
            if (postExist) {
                yield commentModel_1.default.findByIdAndUpdate({ _id: postExist._id }, {
                    $push: {
                        comment: result,
                    },
                });
                res.status(201).json({
                    status: true,
                    message: "Comment Posted",
                    username: user === null || user === void 0 ? void 0 : user.username,
                    comment: comment,
                });
            }
            else {
                yield commentModel_1.default.create({
                    postId,
                    comment: result,
                });
                res.status(201).json({
                    status: true,
                    message: "Comment Posted",
                    username: user === null || user === void 0 ? void 0 : user.username,
                    comment: comment,
                });
            }
        }
        else {
            res.status(404);
            throw new Error("Comment not Found");
        }
    })),
    //@desc Get single post comment
    //@route GET /api/comment/:id
    //@access private
    getAllComments: (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const postId = req.params.id;
        const response = yield commentModel_1.default.find({ postId });
        res.status(201).json({ response });
    })),
    //@desc Like post
    //@route POST /api/like/
    //@access private
    likePost: (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { postId, userId } = req.body;
        const post = yield postModel_1.default.findById(postId);
        if (!(post === null || post === void 0 ? void 0 : post.likes.includes(userId))) {
            yield postModel_1.default.updateOne({ _id: postId }, {
                $push: {
                    likes: userId,
                },
            });
        }
        else {
            yield postModel_1.default.updateOne({ _id: postId }, {
                $pull: {
                    likes: userId,
                },
            });
        }
        const posts = yield postModel_1.default.findById(postId);
        if (posts) {
            res.status(201).json({ posts });
        }
        else {
            res.status(404);
            throw new Error("Posts not Found");
        }
    })),
};
