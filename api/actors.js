"use strict";
var express = require("express");
var actor_1 = require("../models/actor");
var router = express.Router();
router.get('/', function (req, res) {
    actor_1.default.find().then(function (actors) {
        res.json(actors);
    }).catch(function (err) {
        console.log(err);
        res.status(500);
    });
});
router.get('/:id', function (req, res) {
    var actorId = req.params.id;
    actor_1.default.findById(actorId).then(function (actor) {
        res.json(actor);
    }).catch(function (err) {
        console.log(err);
        res.status(404);
    });
});
router.post('/', function (req, res) {
    var newObj = req.body;
    actor_1.default.create(newObj).then(function (obj) {
        res.json(obj);
    }).catch(function (err) {
        console.log(err);
        res.status(500);
    });
});
router.post('/:id', function (req, res) {
    var id = req.params.id;
    actor_1.default.findById(id).then(function (actor) {
        actor.name = req.body.name;
        actor.age = req.body.age;
        actor.save().then(function (data) {
            res.json(data);
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
    var actorId = req.params.id;
    actor_1.default.remove({ _id: actorId }).then(function (data) {
        res.json(data);
    }).catch(function (err) {
        console.log(err);
        res.status(500);
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
