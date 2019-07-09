const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');

app.use(bodyParser.json());

MongoClient.connect('mongodb://localhost:27017')
  .then((client) => {
    const db = client.db('khan');
    const playersCollection = db.collection('players');
    const playersRouter = createRouter(playersCollection);
    app.use('/api/players', playersRouter);
  })
  .catch(console.err);

  app.listen(3000, function(){
    console.log(`listening on port ${ this.address().port}`);
  });
