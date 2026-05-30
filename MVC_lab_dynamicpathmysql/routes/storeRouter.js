
const express=require('express')

const storeRouter=express.Router();
//local module
const storeController=require("../controllers/storeController")
storeRouter.get("/",storeController.getIndex)
storeRouter.get("/homes",storeController.getHomes)
storeRouter.get("/bookings",storeController.getBookings)
storeRouter.get("/favourites",storeController.getfavouritelist)
storeRouter.get("/homes/:homeId",storeController.getHomesDetails)
storeRouter.post("/favourites",storeController.postAddtoFavourite)
storeRouter.post("/favourites/delete/:homeId",storeController.postRemoveFromFavourite)
module.exports=storeRouter; 