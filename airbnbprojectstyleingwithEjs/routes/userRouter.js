// const path=require('path')
const express=require('express')

// const rootDir=require("../utils/pathUtil");
const { registerHomes } = require('./hostRouter');
const userRouter=express.Router();
userRouter.get("/",(req,res,next)=>{
  // res.send(`<p>welcome to airbnb</p>
  //   <a href="/host/add-home">Add Home</a>
  //   `)
  // res.sendFile(path.join(__dirname,"../","views","home.html"))
  console.log(registerHomes)
  // res.sendFile(path.join(rootDir,"views","home.html"))
  res.render('home',{registerHomes:registerHomes,pageTitle:"Airbnb Home"})
})
module.exports=userRouter;