"use strict";
var express = require("express");
var passport = require("passport");
var user_1 = require("../models/user");
var router = express.Router();
router.post('/login', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    if (!username || !password) {
        res.status(400).send('Please fill out every field');
    }
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            next(err);
        }
        if (user) {
            res.json({ token: user.generateJWT(), role: user.role });
        }
        res.status(400).send(info);
    })(req, res, next);
});
router.get('/', function (req, res) {
    user_1.default.find().then(function (users) {
        console.log(users);
        res.json(users);
    }).catch(function (err) {
        console.log(err);
        res.status(500);
    });
});
router.get('/:id', function (req, res) {
    var id = req.params.id;
    user_1.default.findById(id).then(function (user) {
        res.json(user);
    }).catch(function (err) {
        console.log(err);
        res.status(500);
    });
});
router.delete('/:id', function (req, res) {
    var userId = req.params.id;
    user_1.default.remove({ _id: userId }).then(function (removedUser) {
        res.sendStatus(200);
    }).catch(function (err) {
        console.log(err);
        res.status(500);
    });
});
router.post('/:id', function (req, res) {
    var userId = req.params.id;
    user_1.default.findById(userId).then(function (user) {
        user.role = req.body.role;
        user.save().then(function (updatedUser) {
            res.json(updatedUser);
        }).catch(function (err) {
            console.log(err);
            res.status(400);
        });
    }).catch(function (err) {
        console.log(err);
        res.status(404);
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
