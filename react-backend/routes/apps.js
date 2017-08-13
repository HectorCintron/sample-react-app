var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var mongoUrl = require('./../db');

function generateLastEdit() {
  const unformattedDate = new Date();
  const mm = (unformattedDate.getMonth() + 1).toString();
  const dd = unformattedDate.getDate().toString();
  const yy = unformattedDate.getFullYear().toString().slice(-2);
  return `${mm}-${dd}-${yy}`;
}

/* GET apps listing. */
router.get('/', (req, res) => {
  MongoClient.connect(mongoUrl, (err, database) => {
    if (err) return console.log(err);
    var db = database;
    db.collection('apps').find().toArray((err, results) => {
      if (err) return console.log(err);
      if (err) console.log(err);
      db.close();
      res.json(results);
    });
  })
}),
/* GET single app listing. */
router.get('/:id', (req, res) => {
  MongoClient.connect(mongoUrl, (err, database) => {
    if (err) return console.log(err);
    var db = database;
    var id = new ObjectID(req.params.id);
    console.log(id);
    db.collection('apps').findOne({ _id: id }, (err, results) => {
      if (err) return res.send(err);
      if (err) console.log(err);
      if (results) console.log(results);
      db.close();
      res.json(results);
    });
  })
}),
/* GET single app listing. */
router.post('/new', (req, res) => {
  MongoClient.connect(mongoUrl, (err, database) => {
    if (err) return console.log(err);
    var db = database;
    var id = new ObjectID(req.params.id);
    db.collection('apps').insert({
      title: req.body.title,
      description: req.body.description,
      lastEdit: generateLastEdit()
    }, (err, results) => {
      if (err) return res.send(err);
      if (err) console.log(err);
      db.close();
      res.send(results);
    });
  })
}),
/* UPDATE app in apps collection */
router.put('/:id', (req, res) => {
  MongoClient.connect(mongoUrl, (err, database) => {
    if (err) return console.log(err);
    var db = database;
    var id = new ObjectID(req.params.id);
    db.collection('apps').findOneAndUpdate({_id: id }, {
      $set: {
        title: req.body.title,
        description: req.body.description,
        lastEdit: generateLastEdit()
      }
    }, {
      upsert: true
    }, (err, result) => {
      if (err) return res.send(err);
      if (err) console.log(err);
      db.close();
      res.send(result);
    })
  })
}),

/* DELETE app from apps collection */
router.delete('/:id', (req, res) => {
  MongoClient.connect(mongoUrl, (err, database) => {
    if (err) return console.log(err);
    var db = database;
    var id = new ObjectID(req.params.id);
    db.collection('apps').remove({ _id: id }, (err, result) => {
      if (err) return res.send(err);
      if (err) console.log(err);
      db.close();
      res.send(result);
    });
  })
})

module.exports = router;