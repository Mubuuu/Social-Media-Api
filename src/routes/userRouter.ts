import { sign } from "crypto"
import express,{Router} from "express"
import authController from "../controllers/User/authController"
import AuthController from '../controllers/User/authController'
import postController from "../controllers/User/postController"
const router:Router = express.Router()

router.post('/signup',AuthController.postRegister)
router.post('/login',AuthController.postLogin)
router.post('/getuser',AuthController.getUserDetails)
router.post('/post',postController.addPost)
router.post('/getposts',postController.getPosts)
router.get('/get-all-posts',postController.getAllPosts)
router.post('/get-all-details',postController.getAllUserDetails)
router.post('/edit-profile',postController.editProfile)
router.post('/add-comment',postController.addComment)
router.post('/get-comments',postController.getAllComments)
router.post('/like-post',postController.likePost)
router.post('/get-all-users',authController.getAllUsers)
router.post('/follow',authController.follow)
router.post('/get-followers',authController.getFollowers)
export default router