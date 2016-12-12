import * as express from 'express';
import Cinema from '../models/cinema';

let router = express.Router();

router.get('/', (req, res) => {
  Cinema.find().populate('actors').then((cinemas) => {
    res.json(cinemas);
  }).catch((err) => {
    console.log(err);
    res.status(404);
  });
});

router.get('/:id', (req, res) => {
  let cinemaId = req.params.id;
  Cinema.findById(cinemaId).populate('actors').then((cinema) => {
    res.json(cinema);
  }).catch((err) => {
      console.log(err);
      res.status(404);
  });
});

router.post('/', (req, res) => {
  let newObj = req.body;
  Cinema.create(newObj).then((cinema) => {
    res.json(cinema);
  }).catch((err) => {
    console.log(err);
    res.status(500);
  });
});

router.post('/:id', (req, res) =>{
  let cinemaId = req.params.id;

  Cinema.findById(cinemaId).then((cinema) => {
    cinema.reviews = req.body.reviews;
    cinema.rating = req.body.rating;
    cinema.actors = req.body.actors;
    cinema.save().then((savedCinema) => {
      res.json(savedCinema);
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
  let cinemaId = req.params.id;
  Cinema.remove({_id:cinemaId}).then((data) => {
    res.json(data);
  }).catch((err) => {
    console.log(err);
    res.status(500);
  });
});

export default router;
