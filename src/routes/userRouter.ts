import express,{Router} from "express"
import userController from "../controllers/User/userController"
import postController from "../controllers/User/postController"
const router:Router = express.Router()


router.get('/',userController.getAllUsers)
router.get('/:id',userController.getUserDetails)
router.post('/get-all-details',postController.getAllUserDetails)
router.put('/profile',userController.editProfile)
router.post('/qrcode',userController.getLink)
router.post('/search-users',userController.searchUsers)
export default router