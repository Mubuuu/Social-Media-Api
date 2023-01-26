import express,{Router} from "express"
import { adminLogin } from "../controllers/Admin/authController"
import { userBlock } from "../controllers/Admin/userHandleController"
const router:Router = express.Router()

router.post('/login',adminLogin)
router.post('/user-block',userBlock)

export default router