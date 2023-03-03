"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postController_1 = __importDefault(require("../controllers/User/postController"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
router.post('/', authMiddleware_1.default, postController_1.default.addPost);
router.get('/:id', authMiddleware_1.default, postController_1.default.getPosts);
router.get('/', authMiddleware_1.default, postController_1.default.getAllPosts);
router.post('/comment', authMiddleware_1.default, postController_1.default.addComment);
router.get('/comment/:id', authMiddleware_1.default, postController_1.default.getAllComments);
router.post('/like', authMiddleware_1.default, postController_1.default.likePost);
exports.default = router;
