"use strict";
var mongoose = require("mongoose");
var ReviewSchema = new mongoose.Schema({
    username: String,
    text: String,
    title: String
});
var CinemaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    releasedate: {
        type: Date,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    story: {
        type: String
    },
    rating: [Number],
    photourl: {
        type: String
    },
    reviews: [ReviewSchema],
    actors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Actor' }]
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = mongoose.model('Cinema', CinemaSchema);
