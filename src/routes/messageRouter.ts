import express,{Router} from "express"
import { addMessage, getMessages } from "../controllers/User/messageController"
const router:Router = express.Router()

router.post("/",addMessage)
router.get("/:chatId",getMessages)

export default router