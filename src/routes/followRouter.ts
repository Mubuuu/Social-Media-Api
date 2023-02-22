import express,{Router} from "express"
import userController from "../controllers/User/userController"
const router:Router = express.Router()

router.post('/',userController.follow)
router.post('/followers/:id',userController.getFollowers)
router.post('/followings/:id',userController.getFollowings)
export default router;