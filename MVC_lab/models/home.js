
const fs=require("fs");
const path=require("path")
const rootDir=require("../utils/pathUtil");
const { json } = require("body-parser");
// let registerHomes=[];
module.exports=class Home{
constructor(houseName,price,location,rating,photoURl){
  this.houseName=houseName;
  this.price=price;
  this.location=location;
  this.rating=rating;
  this.photoURl=photoURl;
}
Save(){
 Home.fetchAll((registerHomes)=>{
    registerHomes.push(this);
    const filePath=path.join(rootDir,"data",'home.json');
    fs.writeFile(filePath,JSON.stringify(registerHomes),(err)=>{
      console.log("file writing err",err);
    });
  })

}
static fetchAll(callback){
 const filePath=path.join(rootDir,"data",'home.json');
 const fileContent=fs.readFile(filePath,(err,data)=>{

  callback(!err ? JSON.parse(data):[]);

})
}
}
// exports.registerHomes=registerHomes;