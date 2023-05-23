import express,{Router} from 'express'
import postController from '../controllers/User/postController'
import protect from '../middleware/authMiddleware'
const router : Router = express.Router()

router.post('/',protect,postController.addPost)
router.get('/:id',protect,postController.getPosts)
router.get('/',protect,postController.getAllPosts)
router.post('/comment',protect,postController.addComment)
router.get('/comment/:id',protect,postController.getAllComments)
router.post('/like',protect,postController.likePost)
export default router