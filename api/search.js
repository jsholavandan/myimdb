"use strict";
var express = require("express");
var cinema_1 = require("../models/cinema");
var router = express.Router();
router.get('/', function (req, res) {
    var srchTxt = req.query.searchTxt;
    cinema_1.default.find({ $text: { $search: srchTxt } }).then(function (cinemas) {
        res.json(cinemas);
    }).catch(function (err) {
        console.log(err);
        res.status(404);
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
