
const fs = require("fs");
const path = require("path")
const rootDir = require("../utils/pathUtil");
const { json } = require("body-parser");
const Favourite = require("./favourite");
// let registerHomes=[];
const homeDatapath = path.join(rootDir, "data", 'home.json');
module.exports = class Home {
  constructor(houseName, price, location, rating, photoURl) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoURl = photoURl;
  }
  Save() {

    Home.fetchAll((registerHomes) => {
      if (this.id) {
        registerHomes = registerHomes.map(home =>
          home.id === this.id ? this : home)

      }
      else {
        this.id = Math.random().toString();
        registerHomes.push(this);
      }
      fs.writeFile(homeDatapath, JSON.stringify(registerHomes), (err) => {
        console.log("file writing err", err);
      });
    })

  }
  static fetchAll(callback) {

    const fileContent = fs.readFile(homeDatapath, (err, data) => {

      callback(!err ? JSON.parse(data) : []);

    })
  }

  static findbyId(homeId, callback) {
    this.fetchAll(homes => {
      const homeFound = homes.find(home => home.id === homeId);
      callback(homeFound);
    })
  }
  static deletebyId(homeId, callback) {
    this.fetchAll(homes => {
     const home =homes.filter(home=>home.id !==homeId);
     fs.writeFile(homeDatapath, JSON.stringify(home), err=>{
       Favourite.deletebyId(homeId,callback)

     });
    })
  }
}
// exports.registerHomes=registerH    omes;