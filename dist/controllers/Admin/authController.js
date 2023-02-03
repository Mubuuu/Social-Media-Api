"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLogin = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../../utils/jwt");
const adminModel_1 = __importDefault(require("../../models/adminModel"));
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const admin = yield adminModel_1.default.find({ email });
        if (admin) {
            const passwordCheck = yield bcrypt_1.default.compare(password, admin[0].password);
            if (passwordCheck) {
                const token = (0, jwt_1.generateToken)({ id: admin[0]._id.toString() }, "30m");
                res.status(200).json({
                    status: true,
                    token: token,
                    message: "Admin loggedIn successfully",
                });
            }
            else {
                res.status(201).json({ status: false, message: "incorrect password" });
            }
        }
        else {
            res.status(201).json({ status: false, message: "incorrect email" });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.adminLogin = adminLogin;
