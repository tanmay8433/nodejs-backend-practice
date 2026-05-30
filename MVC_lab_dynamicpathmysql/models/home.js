const db=require("../utils/databaseUtil");

module.exports = class Home {
  constructor(houseName, price, location, rating, photoURl,description,id) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoURl = photoURl;
    this.description=description;
    this.id=id;
  }
  Save() {
return db.execute("INSERT INTO homes(name,price,location,rating,imagrUrl,description)VALUES(?,?,?,?,?,?)",[this.houseName,this.price,this.location,this.rating,this.photoURl,this.description]);
  }
  static fetchAll() {
return db.execute("SELECT * from homes")
  }

  static findbyId(homeId, callback) {
   
  }
  static deletebyId(homeId, callback) {
   
  }
}
// exports.registerHomes=registerHomes;