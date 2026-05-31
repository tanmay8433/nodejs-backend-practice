const { getDb } = require("../utils/databaseUtil");


module.exports=class Favourite{

  constructor(homeId) {
   this.homeId=homeId;
  }
  save(){
    const db=getDb();
   return db.collection("favourites").findOne({homeId:this.homeId}).then(exitingFav=>{
    if(!exitingFav){

      return db.collection("favourites").insertOne(this);
    }
    return new Promise.resolve();
   })
  }

static getFavourite(){
    const db=getDb();
    // collection.find (query) retrieves document matching the query criteria. 
    return db.collection("favourites")
    .find()
    .toArray();
}
  static deletebyId(delhomeId, callback) {
    const db=getDb();
    return db.collection("favourites")
    .find({homeId:delhomeId})
  }
}
