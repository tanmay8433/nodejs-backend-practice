const path=require('path')
const express=require('express')
const rootDir=require("../utils/pathUtil")
const hostRouter=express.Router();
hostRouter.get("/add-home",(req,res,next)=>{
  // res.send(`<p>Register your home here:</p>
  // <form action="/host/add-home" method="POST">
  // <input type="text" name="houseName" placeholder="enter the name of your house"/>
  // <input type="submit"/>
  // </form>
  //   `)
      // res.sendFile(path.join(__dirname,"../","views","addHome.html"))
       res.sendFile(path.join(rootDir,"views","addHome.html"))
})

hostRouter.post("/add-home",(req,res,next)=>{
  console.log(req.body);
  // res.send(`<p>Home register successfully</p>
  //   <a href="/">go to Home</a>
  //   `)
      // res.sendFile(path.join(__dirname,"../","views","homeAdded.html"))
      res.sendFile(path.join(rootDir,"views","homeAdded.html"))
})
module.exports=hostRouter;