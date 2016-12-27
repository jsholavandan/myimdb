"use strict";
var express = require("express");
var review_1 = require("../models/review");
var router = express.Router();
router.get('/', function (req, res) {
    review_1.default.find().then(function (reviews) {
        res.json(reviews);
    }).catch(function (err) {
        console.log(err);
        res.status(500);
    });
});
router.post('/', function (req, res) {
    var newReview = req.body;
    review_1.default.create(newReview).then(function (obj) {
        res.json(obj);
    }).catch(function (err) {
        console.log(err);
    });
});
router.delete('/:id', function (req, res) {
    var reviewId = req.params.id;
    review_1.default.remove({ _id: reviewId }).then(function (data) {
        res.status(200);
    }).catch(function (err) {
        console.log(err);
        res.status(500);
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
