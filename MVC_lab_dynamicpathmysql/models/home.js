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
    if(this.id){
return db.execute(
  "UPDATE homes SET name=?, price=?, location=?, rating=?, imagrUrl=?, description=? WHERE id=?",
  [
    this.houseName,
    this.price,
    this.location,
    this.rating,
    this.photoURl,
    this.description,
    this.id
  ]
);
    }else{

      return db.execute("INSERT INTO homes(name,price,location,rating,imagrUrl,description)VALUES(?,?,?,?,?,?)",[this.houseName,this.price,this.location,this.rating,this.photoURl,this.description]);
    }
  }
  static fetchAll() {
return db.execute("SELECT * from homes")
  }

  static findbyId(homeId) {
   return db.execute("SELECT * from homes WHERE id=?",[homeId])
  }
  static deletebyId(homeId) {
   return db.execute("DELETE from homes WHERE id=?",[homeId]) 
  }
}
// exports.registerHomes=registerHomes;