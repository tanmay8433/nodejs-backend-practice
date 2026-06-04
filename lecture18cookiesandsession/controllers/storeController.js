
const { raw } = require("body-parser");
const Favourite = require("../models/favourite");
const Home = require("../models/home")


exports.getIndex = (req, res, next) => {
       console.log("is session",req.session)
       Home.find().then(registerHomes=>{
 res.render('store/index', { registerHomes: registerHomes, pageTitle: "Airbnb home", currentPage: "index",isLoggedIn:req.isLoggedIn })
       });
}

exports.getHomes = (req, res, next) => {

      Home.find().then(registerHomes=>{
               res.render('store/home-list', { registerHomes: registerHomes, pageTitle: "Airbnb list", currentPage: "Home" ,isLoggedIn:req.isLoggedIn})});
}

exports.getfavouritelist = (req, res, next) => {
       Favourite.find().populate('houseId').then((favourites) => {
const favouritesHomes=favourites.map(fav=>
       fav.houseId
);
                     res.render('store/favourite-list', { favouritewithDetails: favouritewithDetails, pageTitle: "Airbnb favourite-list", currentPage: "favourite-list",isLoggedIn:req.isLoggedIn })       
       });

}

exports.postAddtoFavourite = (req, res, next) => {
  const homeId = req.body.id;

  Favourite.findOne({ houseId: homeId })
    .then((fav) => {
      if (fav) {
        console.log("Already marked as favourite");
      } else {
        const newFav = new Favourite({
          houseId: homeId,
        });

        return newFav.save();
      }
    })
    .then(() => {
      res.redirect("/favourites");
    })
    .catch((err) => {
      console.error("Error while marking favourite:", err);
    });
};
exports.getBookings = (req, res, next) => {
       res.render('store/bookings', { pageTitle: "My Bookings", currentPage: "bookings",isLoggedIn:req.isLoggedIn });

}
exports.getHomesDetails = (req, res, next) => {
       const homeId = req.params.homeId;
       Home.findById(homeId).then(home => {
              // const home=homes[0]
              if (!home) {
                     console.log("Home not found")
                     res.redirect("/homes")
              }
              else {

                     res.render('store/home-details', { pageTitle: "Home details", currentPage: "home-details", home: home,isLoggedIn:req.isLoggedIn });
              }
       })
}
exports.postRemoveFromFavourite = (req, res, next) => {
   const homeId=req.params.homeId;
   Favourite.findOneAndDelete({houseId:homeId}).then(result=>{
   }).catch(err=>{
          
                        console.log('error while removing from Favourite',error);

   })
.finally(()=>{

       res.redirect("/favourites");
})
       
   
}