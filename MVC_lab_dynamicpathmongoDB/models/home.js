const { ObjectId } = require("mongodb");
const {getDb} = require("../utils/databaseUtil");


module.exports = class Home {
  constructor(houseName, price, location, rating, photoURl,description,_id) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoURl = photoURl;
    this.description=description;
    if(_id){

      this._id=_id;
    }
  }
  Save() {
   const db=getDb();
   if(this._db){
    const updateFields={
     houseName: this.houseName,
      price:this.price,
    location: this.location,
    rating:this.rating,
    photoURl:this.photoURl,
    description:this.description
    }
return db.collection("homes")
.updateOne({
  _id:new ObjectId(String(this._id))
},{$set :this})
   }else{
     return db.collection("homes").insertOne(this);
   }
    }
  static fetchAll() {
    const db=getDb();
    // collection.find (query) retrieves document matching the query criteria. 
    return db.collection("homes")
    .find()
    .toArray();

  }

  static findbyId(homeId) {
    const db=getDb();
    return db.collection("homes")
    .find({_id:new ObjectId(String(homeId))})
    .next()
  }
  static deleteById(homeId) {
    const db=getDb();
    return db.collection("homes")
    .find({_id:new ObjectId(String(homeId))})
    
  }

}
