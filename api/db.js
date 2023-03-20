const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/airdb';

const connect = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, (err, db) => {
      if (err) {
        reject(err);
      } else {
        console.log('Connected to MongoDB');
        resolve(db);
      }
    });
  });
};



module.exports = connect;