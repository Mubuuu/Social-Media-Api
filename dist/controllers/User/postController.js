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
const postModel_1 = __importDefault(require("../../models/postModel"));
exports.default = {
    addPost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const postData = req.body;
        const newPost = new postModel_1.default(postData);
        const hai = yield newPost.save();
        res.status(201).json({ status: true, message: "post added" });
    }),
    getPosts: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId } = req.body;
        console.log(userId, "useriddddd");
        const data = yield postModel_1.default.find({ userId });
        console.log(data, "kaakakakassk");
        if (data.length > 0) {
            console.log(data, 'datatatatatata');
            res.status(201).json({ data });
        }
        else {
            console.log('rerre');
            res.json({ mesage: "no posts yet" });
        }
    }),
};
