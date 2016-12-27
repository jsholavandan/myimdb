"use strict";
var mongoose = require("mongoose");
var reviewSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    title: {
        type: String
    }
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = mongoose.model("Review", reviewSchema);
