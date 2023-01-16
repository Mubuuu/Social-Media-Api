"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    likes: {
        type: [],
        required: true
    }
});
exports.default = (0, mongoose_1.model)("post", postSchema);
