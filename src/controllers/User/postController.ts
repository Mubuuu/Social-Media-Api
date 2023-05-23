import { Response, Request, response } from "express";
import asyncHandler from "express-async-handler";
import commentModel from "../../models/commentModel";
import postModel from "../../models/postModel";
import userModel from "../../models/userModel";

export default {
  //@desc Upload Post
  //@route POST /api/post/
  //@access private
  addPost: asyncHandler(async (req: Request, res: Response) => {
    const postData = req.body;
    const newPost = new postModel(postData);
    await newPost.save();
    res.status(201).json({ status: true, message: "post added" });
  }),
  //@desc Get all posts of a user
  //@route GET /api/post/:id
  //@access private
  getPosts: asyncHandler(async (req: Request, res: Response) => {
    const userId = req.params.id;
    const data = await postModel.find({ userId });
    if (data.length > 0) {
      res.status(201).json({ data });
    } else {
      res.status(404);
      throw new Error("Posts not Found");
    }
  }),
  //@desc Get all Posts
  //@route GET /api/post/
  //@access private
  getAllPosts: asyncHandler(async (req: Request, res: Response) => {
    const data = await postModel.find().populate("userId");
    res.status(201).json({ data });
  }),
  getAllUserDetails: asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.body;
    const userData = await userModel.findOne({ _id: userId });
    const userPosts = await postModel.find({ userId });
    res.status(201).json({ userData, userPosts });
  }),
  //@desc Add Comment
  //@route POST /api/post/comment
  //@access private
  addComment: asyncHandler(async (req: Request, res: Response) => {
    const { userId, postId, comment } = req.body;
    const comments = comment.trim();
    const user = await userModel.findOne({ _id: userId });
    const result = { username: user?.username, comments };
    const postExist = await commentModel.findOne({ postId });
    if (comments.length > 0) {
      if (postExist) {
        await commentModel.findByIdAndUpdate(
          { _id: postExist._id },
          {
            $push: {
              comment: result,
            },
          }
        );
        res.status(201).json({
          status: true,
          message: "Comment Posted",
          username: user?.username,
          comment: comment,
        });
      } else {
        await commentModel.create({
          postId,
          comment: result,
        });
        res.status(201).json({
          status: true,
          message: "Comment Posted",
          username: user?.username,
          comment: comment,
        });
      }
    } else {
      res.status(404);
      throw new Error("Comment not Found");
    }
  }),
  //@desc Get single post comment
  //@route GET /api/comment/:id
  //@access private
  getAllComments: asyncHandler(async (req: Request, res: Response) => {
    const postId = req.params.id;
    const response = await commentModel.find({ postId });
    res.status(201).json({ response });
  }),
  //@desc Like post
  //@route POST /api/like/
  //@access private
  likePost: asyncHandler(async (req: Request, res: Response) => {
    const { postId, userId } = req.body;
    const post = await postModel.findById(postId);
    if (!post?.likes.includes(userId)) {
      await postModel.updateOne(
        { _id: postId },
        {
          $push: {
            likes: userId,
          },
        }
      );
    } else {
      await postModel.updateOne(
        { _id: postId },
        {
          $pull: {
            likes: userId,
          },
        }
      );
    }
    const posts = await postModel.findById(postId);
    if (posts) {
      res.status(201).json({ posts });
    } else {
      res.status(404);
      throw new Error("Posts not Found");
    }
  }),
};
