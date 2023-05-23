"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongooseconnect = process.env.MONGO_URI;
if (mongooseconnect) {
    mongoose_1.default.set('strictQuery', false);
    mongoose_1.default.connect(mongooseconnect, (err) => {
        if (err)
            return console.log('error connetion' + err);
        console.log('Database connected');
    });
}
exports.default = mongoose_1.default;
