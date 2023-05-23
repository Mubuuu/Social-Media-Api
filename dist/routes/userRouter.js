"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/User/userController"));
const postController_1 = __importDefault(require("../controllers/User/postController"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
router.get('/', authMiddleware_1.default, userController_1.default.getAllUsers);
router.get('/:id', authMiddleware_1.default, userController_1.default.getUserDetails);
router.post('/get-all-details', authMiddleware_1.default, postController_1.default.getAllUserDetails);
router.put('/profile', authMiddleware_1.default, userController_1.default.editProfile);
router.post('/qrcode', authMiddleware_1.default, userController_1.default.getLink);
router.post('/search-users', authMiddleware_1.default, userController_1.default.searchUsers);
exports.default = router;
