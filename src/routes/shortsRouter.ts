import express,{Router} from "express"
import shortsController from "../controllers/User/shortsController"
const router:Router = express.Router()

router.get('/',shortsController.getAllShorts)
router.post('/',shortsController.uploadShorts)
export default router