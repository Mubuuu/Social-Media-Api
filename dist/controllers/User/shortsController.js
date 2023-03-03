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
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const shortModel_1 = __importDefault(require("../../models/shortModel"));
exports.default = {
    //@desc Upload Shorts
    //@route POST /api/shorts/
    //@access private
    uploadShorts: (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const shorts = req.body;
        const newShort = new shortModel_1.default(shorts);
        yield newShort.save();
        res.status(201).json({ status: true, message: "Short added successfully" });
    })),
    //@desc Get all shorts
    //@route GET /api/shorts/
    //@access private
    getAllShorts: (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const allShorts = yield shortModel_1.default
            .find()
            .populate("userId")
            .sort({ createdAt: -1 });
        res.status(200).json(allShorts);
    })),
};
