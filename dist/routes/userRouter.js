"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../controllers/User/authController"));
const postController_1 = __importDefault(require("../controllers/User/postController"));
const router = express_1.default.Router();
router.post('/signup', authController_1.default.postRegister);
router.post('/login', authController_1.default.postLogin);
router.post('/getuser', authController_1.default.getUserDetails);
router.post('/post', postController_1.default.addPost);
router.post('/getposts', postController_1.default.getPosts);
exports.default = router;
