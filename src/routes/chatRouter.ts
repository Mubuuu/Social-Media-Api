import express,{Router} from "express"
import { createChat, findChat, userChats } from "../controllers/User/chatController"
import protect from "../middleware/authMiddleware"
const router:Router = express.Router()

router.post("/",protect,createChat)
router.get("/:userId",protect,userChats)
router.get("/find/:fistId/:secondId",protect,findChat)


export default router