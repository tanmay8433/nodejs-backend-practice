const mongodb=require("mongodb");
const { MongoClient } = require("mongodb");


const url =
  "mongodb+srv://root:Qwerty%408433@completecoding.ndwpjkz.mongodb.net/homesDB?retryWrites=true&w=majority";
let _db;
const mongoConnect = async (callback) => {
  try {
    const client = await MongoClient.connect(url);
    _db=client.db("airbnb")
    callback();
  } catch (err) {
    console.error(err);
  }
};
const getDb=()=>{
  if(!_db){
    throw new Error("Database not connected");
  }
  return _db;
};
exports.mongoConnect=mongoConnect;
exports.getDb=getDb;