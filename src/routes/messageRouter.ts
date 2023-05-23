import express,{Router} from "express"
import { addMessage, getMessages } from "../controllers/User/messageController"
import protect from "../middleware/authMiddleware"
const router:Router = express.Router()

router.post("/",protect,addMessage)
router.get("/:chatId",protect,getMessages)

export default router