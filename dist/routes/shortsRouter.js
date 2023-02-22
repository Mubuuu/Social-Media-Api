"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const shortsController_1 = __importDefault(require("../controllers/User/shortsController"));
const router = express_1.default.Router();
router.get('/', shortsController_1.default.getAllShorts);
router.post('/', shortsController_1.default.uploadShorts);
exports.default = router;
