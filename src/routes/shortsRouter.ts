import express,{Router} from "express"
import shortsController from "../controllers/User/shortsController"
import protect from "../middleware/authMiddleware"

const router:Router = express.Router()

router.get('/',protect,shortsController.getAllShorts)
router.post('/',protect,shortsController.uploadShorts)
export default router