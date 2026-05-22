const path=require('path')
const express=require('express')

const rootDir=require("../utils/pathUtil")
const userRouter=express.Router();
userRouter.get("/",(req,res,next)=>{
  // res.send(`<p>welcome to airbnb</p>
  //   <a href="/host/add-home">Add Home</a>
  //   `)
  // res.sendFile(path.join(__dirname,"../","views","home.html"))
  res.sendFile(path.join(rootDir,"views","home.html"))
})
module.exports=userRouter;