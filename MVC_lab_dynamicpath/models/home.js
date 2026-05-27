
const fs=require("fs");
const path=require("path")
const rootDir=require("../utils/pathUtil");
const { json } = require("body-parser");
// let registerHomes=[];
const homeDatapath=path.join(rootDir,"data",'home.json');
module.exports=class Home{
constructor(houseName,price,location,rating,photoURl){
  this.houseName=houseName;
  this.price=price;
  this.location=location;
  this.rating=rating;
  this.photoURl=photoURl;
}
Save(){
  this.id=Math.random().toString()
 Home.fetchAll((registerHomes)=>{
    registerHomes.push(this);
    fs.writeFile(homeDatapath,JSON.stringify(registerHomes),(err)=>{
      console.log("file writing err",err);
    });
  })

}
static fetchAll(callback){

 const fileContent=fs.readFile(homeDatapath,(err,data)=>{

  callback(!err ? JSON.parse(data):[]);

})
}

static findbyId(homeId,callback){
this.fetchAll(homes=>{
  const homeFound=homes.find((home)=>home.id===homeId);
  callback(homeFound);
})
}

}
// exports.registerHomes=registerHomes;