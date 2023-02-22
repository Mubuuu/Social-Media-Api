"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../controllers/User/authController"));
const router = express_1.default.Router();
router.post('/signup', authController_1.default.postRegister);
router.post('/login', authController_1.default.postLogin);
router.post('/change-password', authController_1.default.changePassword);
router.post('/google-login', authController_1.default.googleLogin);
exports.default = router;
