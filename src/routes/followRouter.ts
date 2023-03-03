import express,{Router} from "express"
import userController from "../controllers/User/userController"
import protect from "../middleware/authMiddleware"
const router:Router = express.Router()

router.post('/',protect,userController.follow)
router.get('/followers/:id',protect,userController.getFollowers)
router.get('/followings/:id',protect,userController.getFollowings)
export default router;