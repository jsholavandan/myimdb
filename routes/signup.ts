import * as mongoose from 'mongoose';
import * as express from 'express';

import User from '../models/user';

let router = express.Router();

router.post('/register', (req, res, next) => {  
  let user:any = new User();
  user.username = req.body.username;
  user.email = req.body.email;
  user.setPassword(req.body.password);
  console.log(user);

  user.save(function(err, userSaved){
    if(err){
      console.log(err);
      res.sendStatus(500);
    }else{
      res.json({message:'Registration complete please login.'});
    }
  });
});

export default router;
