import * as express from 'express';
import Actor from '../models/actor';

let router = express.Router();

router.get('/', (req, res) => {
  Actor.find().then((actors) => {
    res.json(actors);
  }).catch((err) => {
    console.log(err);
    res.status(500);
  });
});

router.get('/:id', (req, res) => {
  let actorId = req.params.id;
  Actor.findById(actorId).then((actor) => {
    res.json(actor);
  }).catch((err) => {
    console.log(err);
    res.status(404);
  });
});

router.post('/', (req, res) => {
  let newObj = req.body;
  Actor.create(newObj).then((obj) => {
    res.json(obj);
  }).catch((err) => {
    console.log(err);
    res.status(500);
  });
});

router.post('/:id', (req, res) => {
  let id = req.params.id;
  Actor.findById(id).then((actor) =>{
    actor.name = req.body.name;
    actor.age = req.body.age;
    actor.save().then((data) => {
      res.json(data);
    }).catch((err) => {
      console.log(err);
      res.status(500);
    });
  }).catch((err) => {
    console.log(err);
    res.status(404);
  });
});

router.delete('/:id', (req, res) => {
  let actorId = req.params.id;
  Actor.remove({_id:actorId}).then((data) => {
    res.json(data);
  }).catch((err) => {
    console.log(err);
    res.status(500);
  });
});

export default router;
