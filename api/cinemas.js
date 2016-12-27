"use strict";
var express = require("express");
var cinema_1 = require("../models/cinema");
var router = express.Router();
router.get('/', function (req, res) {
    cinema_1.default.find().populate('actors').then(function (cinemas) {
        res.json(cinemas);
    }).catch(function (err) {
        console.log(err);
        res.status(404);
    });
});
router.get('/:id', function (req, res) {
    var cinemaId = req.params.id;
    cinema_1.default.findById(cinemaId).populate('actors').then(function (cinema) {
        res.json(cinema);
    }).catch(function (err) {
        console.log(err);
        res.status(404);
    });
});
router.post('/', function (req, res) {
    var newObj = req.body;
    cinema_1.default.create(newObj).then(function (cinema) {
        res.json(cinema);
    }).catch(function (err) {
        console.log(err);
        res.status(500);
    });
});
router.post('/:id', function (req, res) {
    var cinemaId = req.params.id;
    cinema_1.default.findById(cinemaId).then(function (cinema) {
        cinema.reviews = req.body.reviews;
        cinema.rating = req.body.rating;
        cinema.actors = req.body.actors;
        cinema.save().then(function (savedCinema) {
            res.json(savedCinema);
        }).catch(function (err) {
            console.log(err);
            res.status(500);
        });
    }).catch(function (err) {
        console.log(err);
        res.status(404);
    });
});
router.delete('/:id', function (req, res) {
    var cinemaId = req.params.id;
    cinema_1.default.remove({ _id: cinemaId }).then(function (data) {
        res.json(data);
    }).catch(function (err) {
        console.log(err);
        res.status(500);
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
