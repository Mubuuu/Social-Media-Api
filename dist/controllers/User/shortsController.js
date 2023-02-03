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
const shortModel_1 = __importDefault(require("../../models/shortModel"));
exports.default = {
    uploadShorts: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const shorts = req.body;
        try {
            const newShort = new shortModel_1.default(shorts);
            yield newShort.save();
            res
                .status(201)
                .json({ status: true, message: "Short added successfully" });
        }
        catch (error) {
            res.json(error);
        }
    }),
    getAllShorts: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const allShorts = yield shortModel_1.default
                .find()
                .populate("userId")
                .sort({ createdAt: -1 });
            res.status(200).json(allShorts);
        }
        catch (error) {
            res.json(error);
        }
    }),
};
