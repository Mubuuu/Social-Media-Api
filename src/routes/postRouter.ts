import express,{Router} from 'express'
import postController from '../controllers/User/postController'
const router : Router = express.Router()

router.post('/',postController.addPost)
router.get('/:id',postController.getPosts)
router.get('/',postController.getAllPosts)
router.post('/comment',postController.addComment)
router.get('/comment/:id',postController.getAllComments)
router.post('/like',postController.likePost)
export default router