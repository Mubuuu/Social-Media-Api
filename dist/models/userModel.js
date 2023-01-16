"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// creating schema
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
        default: "-",
    },
    mobile: {
        type: String,
        required: true,
    },
    place: {
        type: String,
        default: "location",
    },
    bio: {
        type: String,
        default: "- -",
    },
    relationship: {
        type: String,
        default: "Relationship status",
    },
    profile_img: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },
    cover_img: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    },
    verified: {
        type: Boolean,
        default: false,
    },
    active: {
        type: Boolean,
        default: false,
    },
    followers: [],
    following: [],
});
exports.default = (0, mongoose_1.model)("user", userSchema);
