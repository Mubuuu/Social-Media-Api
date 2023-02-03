"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    postId: {
        type: String,
        ref: "post",
        required: true,
    },
    comment: {
        type: [
            {
                username: String,
                comments: String,
            },
        ],
    },
});
exports.default = (0, mongoose_1.model)("comment", commentSchema);
