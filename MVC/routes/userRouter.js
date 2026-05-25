
const express=require('express')

const userRouter=express.Router();
//local module
const homeController=require("../controllers/home")
userRouter.get("/",homeController.getHomes)
module.exports=userRouter;