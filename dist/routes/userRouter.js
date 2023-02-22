"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/User/userController"));
const postController_1 = __importDefault(require("../controllers/User/postController"));
const router = express_1.default.Router();
router.get('/', userController_1.default.getAllUsers);
router.get('/:id', userController_1.default.getUserDetails);
router.post('/get-all-details', postController_1.default.getAllUserDetails);
router.put('/profile', userController_1.default.editProfile);
router.post('/qrcode', userController_1.default.getLink);
router.post('/search-users', userController_1.default.searchUsers);
exports.default = router;
