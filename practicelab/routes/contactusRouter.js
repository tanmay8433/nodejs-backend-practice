const path=require('path')
const express=require('express')
const rootDir=require("../utils/pathUtil")
const contactusRouter=express.Router();
contactusRouter.get("/contact-us",(req,res,next)=>{
         res.sendFile(path.join(rootDir,"views","addcontactus.html"))
  })
  contactusRouter.post("/contact-us",(req,res,next)=>{
  console.log(req.body);
    res.sendFile(path.join(rootDir,"views","contactusAdded.html"))
  })
  module.exports=contactusRouter;