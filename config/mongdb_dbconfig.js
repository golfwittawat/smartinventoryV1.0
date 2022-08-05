// Import Mongodb
const MongoClient = require("mongodb").MongoClient;

// Mongodb Connection String
// const url = "mongodb://localhost:27017/" // No user/passsword
const url = "mongodb://admingolf:admingolf@localhost:27017/"; // With user/password/ With user/password

var _db;
var dbname = "smartinvdb";

const connectDb = (callback) => {
  if (_db) return callback();
  MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
    if (err) return console.log(err);
    _db = client.db(dbname);
    console.log("Database Connected");
    callback();
  });
};

const getDb = () => _db;

module.exports = {
  connectDb,
  getDb,
};
