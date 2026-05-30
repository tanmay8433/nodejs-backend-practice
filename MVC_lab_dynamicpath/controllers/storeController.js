
const Favourite = require("../models/favourite");
const Home = require("../models/home")

// exports.getAddHome=(req,res,next)=>{
//        res.render("host/addHome",{pageTitle:"addHome",currentPage:"addHome"})
// }
// exports.postAddHome=(req,res,next)=>{
//        // console.log(req.body ,"postAddHome")
//       const {houseName,price,location,rating,photoURl}=req.body;
//   const home= new Home(houseName,price,location,rating,photoURl);
//   home.Save()
//        // registerHomes.push(req.body)
//        res.render("host/homeAdded",{pageTitle:"successfully here",currentPage:"homeAdded"})
// }
exports.getIndex = (req, res, next) => {
       const registerHomes = Home.fetchAll((registerHomes) => res.render('store/index', { registerHomes: registerHomes, pageTitle: "Airbnb home", currentPage: "index" }));

}

exports.getHomes = (req, res, next) => {

       const registerHomes = Home.fetchAll((registerHomes) => res.render('store/home-list', { registerHomes: registerHomes, pageTitle: "Airbnb list", currentPage: "Home" }));
}

exports.getfavouritelist = (req, res, next) => {
       Favourite.getFavourite((favourites) => {

              Home.fetchAll((registerHomes) => 
              {

                     const favouritewithDetails =  registerHomes.filter(home => favourites.includes(home.id));

                     res.render('store/favourite-list', { favouritewithDetails: favouritewithDetails, pageTitle: "Airbnb favourite-list", currentPage: "favourite-list" })
       
              }
       );
       });

}

exports.postAddtoFavourite = (req, res, next) => {
       console.log(req.body, "came to add to favourite");
       Favourite.addToFavourite(req.body.id, err => {
              if (err) {

                     console.log("error while marking favourite", err)
              }
              res.redirect("/favourites")
       })
       // const registerHomes=Home.fetchAll((registerHomes)=> res.render('store/favourite-list',{registerHomes:registerHomes,pageTitle:"Airbnb favourite-list",currentPage:"favourite-list"}));

}
exports.getBookings = (req, res, next) => {
       res.render('store/bookings', { pageTitle: "My Bookings", currentPage: "bookings" });

}
exports.getHomesDetails = (req, res, next) => {
       const homeId = req.params.homeId;
       Home.findbyId(homeId, home => {
              if (!home) {
                     console.log("Home not found")
                     res.redirect("/homes")
              }
              else {

                     res.render('store/home-details', { pageTitle: "Home details", currentPage: "home-details", home: home });
              }
       })
}
exports.postRemoveFromFavourite = (req, res, next) => {
   const homeId=req.params.homeId;
   Favourite.deletebyId(homeId,error=>{
       if(error){
              console.log('error while removing from Favourite',error);
       }
       res.redirect("/favourites");
   })
}