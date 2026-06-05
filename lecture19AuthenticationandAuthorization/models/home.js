// const { ObjectId } = require("mongodb");
const mongoose =require("mongoose");
// const favourite = require("./favourite");

const homeSchema=mongoose.Schema({
houseName:{
  type:String,
  required:true
},
price:{
  type:String,
  required:true
},
location:{
  type:String,
  required:true
},
rating:{
  type:String,
  required:true
},
photoURl:String,
description:String,
});
// homeSchema.pre('findOneAndDelete',async function (next) {
//   const homeId=this.getQuery()._id;
//   await favourite.deleteMany({houseId:homeId});
//   next();
// })
module.exports=mongoose.model('Home',homeSchema);


//     this.houseName = houseName;
    // this.price = price;
    // this.location = location;
    // this.rating = rating;
    // this.photoURl = photoURl;
    // this.description=description;
    // this._id=_id;


    // save()
// find() 
// findById(homeId)
// deleteById(homeId)