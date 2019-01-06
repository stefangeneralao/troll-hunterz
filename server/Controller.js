import { uri } from './mongodbConfig.js';
import { MongoClient } from 'mongodb';
import Sentiment from 'sentiment';

const sentiment = new Sentiment();

export default class Controller {
  constructor() {
    const mongoClient = new MongoClient(
      uri,
      { useNewUrlParser: true },
    );
    mongoClient.connect();
    this.client = mongoClient;
  }
  
  getAllEntries = (_req, res) => {
    const { client } = this;
    const collection = client.db('trollhunterz').collection('entries');
    collection.find({}).toArray((err, result) => {
      if (err) {
        res.status(500).send('Database failure');
        return;
      }
      const entries = result.map(({ _id, comparative, score }) => ({
        value: _id.value,
        comparative,
        score,
      })).reverse();
      res.status(200).send({ entries });
    });
  }

  getEntry = (req, res) => {
    const { client } = this;
    const { value } = req.body;
    const collection = client.db('trollhunterz').collection('entries');
    collection.find({ _id: { value } }).toArray((err, result) => {
      if (err) {
        res.sendStatus(500);
        return;
      }
      const entries = result.map(({ _id, comparative, score }) => ({
        value: _id.value,
        comparative,
        score,
      }));
      res.status(200).send({ entries });
    });
  }

  insertEntry = (req, res) => {
    const { client } = this;
    const collection = client.db('trollhunterz').collection('entries');
    const { value } = req.body;
    if (!value) {
      res.status(400).send('Empty body');
      return;
    }
  
    try {
      const { comparative, score } = sentiment.analyze(value);
      try {
        collection.insertOne({
          _id: {
            value,
          },
          comparative,
          score,
        });
        res.sendStatus(200);
        return;
      } catch (e) {
        res.status(500).send('Database failure.');
        return;
      }
    } catch (e) {
      res.status(500).send('Analyze failure');
      return;
    }
  }
}
