import * as express from 'express';
import mongoose = require('mongoose');
import passport = require('passport');
import jwt = require('jsonwebtoken');
import User = require('../models/user');

let router = express.Router();

router.post('/login', function(req, res, next){
  let username = req.body.username;
  let password = req.body.password;
  if(!username || !password){
    res.status(400).send('Please fill out every field');
  }

  passport.authenticate('local', function(err, user, info){
    if(err){
      next(err);
    }

    if(user){
      res.json({token: user.generateJWT()});
    }
    res.status(400).send(info);
  })(req, res, next);
});

export default router;
