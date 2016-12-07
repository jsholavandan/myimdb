import * as express from 'express';
import mongoose = require('mongoose');
import passport = require('passport');
import jwt = require('jsonwebtoken');
import User from '../models/user';

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
      res.json({token: user.generateJWT(), role:user.role});
    }
    res.status(400).send(info);
  })(req, res, next);
});


router.get('/', (req, res) => {
  User.find().then((users) => {
    console.log(users);
    res.json(users);
  }).catch((err) => {
    console.log(err);
    res.status(500);
  });
});

router.get('/:id', (req, res) => {
  let id = req.params.id;

  User.findById(id).then((user) => {
    res.json(user);
  }).catch((err) => {
    console.log(err);
    res.status(500);
  });
});

router.delete('/:id', (req, res) => {
  let userId = req.params.id;
  User.remove({_id:userId}).then((removedUser) => {
    res.sendStatus(200);
  }).catch((err) => {
    console.log(err);
    res.status(500);
  })
});

router.post('/:id', (req, res) => {
  let userId = req.params.id;
  User.findById(userId).then((user:any) => {
    user.role = req.body.role;
    user.save().then((updatedUser) => {
      res.json(updatedUser);
    }).catch((err) => {
      console.log(err);
      res.status(400);
    });
  }).catch((err) => {
    console.log(err);
    res.status(404);
  });

});

export default router;
