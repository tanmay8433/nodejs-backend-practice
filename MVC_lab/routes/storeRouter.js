
const express=require('express')

const storeRouter=express.Router();
//local module
const storeController=require("../controllers/storeController")
storeRouter.get("/",storeController.getIndex)
storeRouter.get("/homes",storeController.getHomes)
storeRouter.get("/bookings",storeController.getBookings)
storeRouter.get("/favourite-list",storeController.getfavouritelist)
// storeRouter.get("/home-details",storeController.gethomedetails)
// storeRouter.get("/reserve",storeController.getreserve)
module.exports=storeRouter;