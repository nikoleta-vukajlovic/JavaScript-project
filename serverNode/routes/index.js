var express = require('express');
var router = express.Router();


const MongoClient = require('mongodb').MongoClient;
/* GET home page. */

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'mindGameDB', collectionName = 'times';
let db = null;
let collection = null;
// Use connect method to connect to the server
MongoClient.connect(url,  { useUnifiedTopology: true }, function(err, client) {
  if(err) throw err;
  console.log("Connected successfully to server");

  db = client.db(dbName);
  collection = db.collection(collectionName);
  //client.close();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/addtime', function (req, res) {

  collection.insertOne(req.body, function (err, result) {
    if(err) throw err;
    console.log("Inserted!");
    res.send("OK");
  });

});

router.post('/gettime', async function (req, res) {

  let scores = await collection.find().toArray();
  res.send(scores);
});


module.exports = router;
