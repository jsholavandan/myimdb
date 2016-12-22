import * as express from 'express';
import * as mongoose from 'mongoose';
import Cinema from '../models/cinema';

let router = express.Router();

router.get('/', (req, res) => {
  let srchTxt = req.query.searchTxt;
//  console.log(srchTxt);
  Cinema.find({$text : {$search : srchTxt}}).then((cinemas) => {
    //console.log(cinemas);
    res.json(cinemas);
  }).catch((err) => {
    console.log(err);
    res.status(404);
  });
});

export default router;
