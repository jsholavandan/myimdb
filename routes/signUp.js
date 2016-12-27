"use strict";
var express = require("express");
var user_1 = require("../models/user");
var router = express.Router();
router.post('/register', function (req, res, next) {
    var user = new user_1.default();
    user.username = req.body.username;
    user.email = req.body.email;
    user.role = req.body.role;
    user.setPassword(req.body.password);
    console.log(user);
    user.save(function (err, userSaved) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
        else {
            res.json({ message: 'Registration complete please login.' });
        }
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
