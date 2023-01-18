import express,{Router} from "express"
import { createChat, findChat, userChats } from "../controllers/User/chatController"
const router:Router = express.Router()

router.post("/",createChat)
router.get("/:userId",userChats)
router.get("/find/:fistId/:secondId",findChat)


export default router