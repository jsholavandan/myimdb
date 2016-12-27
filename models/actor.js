"use strict";
var mongoose = require("mongoose");
var actorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    }
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = mongoose.model("Actor", actorSchema);
