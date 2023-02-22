"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postController_1 = __importDefault(require("../controllers/User/postController"));
const router = express_1.default.Router();
router.post('/', postController_1.default.addPost);
router.get('/:id', postController_1.default.getPosts);
router.get('/', postController_1.default.getAllPosts);
router.post('/comment', postController_1.default.addComment);
router.get('/comment/:id', postController_1.default.getAllComments);
router.post('/like', postController_1.default.likePost);
exports.default = router;
