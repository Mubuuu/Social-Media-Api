import express,{Router} from "express"
import userController from "../controllers/User/userController"
import postController from "../controllers/User/postController"
import protect from "../middleware/authMiddleware"
const router:Router = express.Router()


router.get('/',protect,userController.getAllUsers)
router.get('/:id',protect,userController.getUserDetails)
router.post('/get-all-details',protect,postController.getAllUserDetails)
router.put('/profile',protect,userController.editProfile)
router.post('/qrcode',protect,userController.getLink)
router.post('/search-users',protect,userController.searchUsers)
export default router