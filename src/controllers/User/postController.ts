import { Response, Request, response } from "express";
import { json } from "stream/consumers";
import commentModel from "../../models/commentModel";
import postModel from "../../models/postModel";
import userModel from "../../models/userModel";

export default {
  addPost: async (req: Request, res: Response) => {
    try {
      const postData = req.body;
      const newPost = new postModel(postData);
      await newPost.save();
      res.status(201).json({ status: true, message: "post added" });
    } catch (error) {
      console.log(error);
    }
  },
  getPosts: async (req: Request, res: Response) => {
    try {
      const { userId } = req.body;
      const data = await postModel.find({ userId });
      if (data.length > 0) {
        res.status(201).json({ data });
      } else {
        res.json({ mesage: "no posts yet" });
      }
    } catch (error) {
      console.log(error);
    }
  },
  getAllPosts: async (req: Request, res: Response) => {
    try {
      const data = await postModel.find().populate("userId");
      res.status(201).json({ data });
    } catch (error) {
      console.log(error);
    }
  },
  getAllUserDetails: async (req: Request, res: Response) => {
    try {
      const { userId } = req.body;
      console.log(userId, 'userId');
      
      const userData = await userModel.findOne({ _id:userId });
      console.log(userData, "data");

      const userPosts = await postModel.find({ userId });
      res.status(201).json({ userData, userPosts });
    } catch (error) {
      console.log(error);
    }
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
      const respose = await userModel.findByIdAndUpdate(userId, {
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
      console.log(response, "bodyy aaaan");
    } catch (error) {
      console.log(error);
    }
  },
  addComment:async (req: Request, res: Response) => {
   try {
    const {userId,postId,comment} = req.body
    const comments = comment.trim()
    const user = await userModel.findOne({_id:userId})
    const result = {username:user?.username,comments}
    const postExist = await commentModel.findOne({postId})
    if(comments.length>0){
      if(postExist){
        const response = await commentModel.findByIdAndUpdate({_id:postExist._id},{
          $push:{
            comment:result
          }
        })
        res.status(201).json({status:true,message:'Comment Posted'})
      }else{
        const response = await commentModel.create({postId,comment:result})
        res.status(201).json({status:true,message:'Comment Posted'})
      }
    }
    res.json({status:false,message:"Please Add Comment"})
   } catch (error) {
    console.log(error);
   }
  },
  getAllComments:async (req: Request, res: Response) =>{
   try {
    const {postId} = req.body
    const response = await commentModel.find({postId})
    res.status(201).json({response})
   } catch (error) {
    console.log(error);
    
   }
  },
  likePost:async (req: Request, res: Response) =>{
    try {
      const {postId,userId} = req.body
      const post = await postModel.findById(postId)
      if(!post?.likes.includes(userId)){
        const response = await postModel.updateOne({_id:postId},{
          $push:{
            likes:userId
          }
        })        
      }else{
        const response = await postModel.updateOne({_id:postId},{
          $pull:{
            likes:userId
          }
        })
      }
      const posts = await postModel.findById(postId)
      res.status(201).json({posts})  
    } catch (error) {
      console.log(error);
    }
  }
};
