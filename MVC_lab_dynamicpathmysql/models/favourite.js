
const fs=require("fs");
const path=require("path")
const rootDir=require("../utils/pathUtil");
const { json } = require("body-parser");

const favouriteDatapath=path.join(rootDir,"data",'favourite.json');

module.exports=class Favourite{

static addToFavourite(homeId,callback){
 Favourite.getFavourite((favourites)=>{
    if(favourites.includes(homeId)){
      callback("home already in favourites")
      // console.log();
    }
  else{
    
    favourites.push(homeId);
      fs.writeFile(favouriteDatapath,JSON.stringify(favourites),callback );
  }
  })
}
static getFavourite(callback){
 const fileContent=fs.readFile(favouriteDatapath,(err,data)=>{
  callback(!err ? JSON.parse(data):[]);
})
}
  static deletebyId(delhomeId, callback) {
    Favourite.getFavourite(homeIds => {
       homeIds =homeIds.filter(homeId=> delhomeId !== homeId);
     fs.writeFile(favouriteDatapath, JSON.stringify(homeIds), callback);
    })
  }
}
