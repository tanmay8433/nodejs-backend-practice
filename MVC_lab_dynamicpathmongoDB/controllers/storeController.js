
const { raw } = require("body-parser");
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
       Home.fetchAll().then(registerHomes=>{
 res.render('store/index', { registerHomes: registerHomes, pageTitle: "Airbnb home", currentPage: "index" })
       });
}

exports.getHomes = (req, res, next) => {

      Home.fetchAll().then(registerHomes=>{
               res.render('store/home-list', { registerHomes: registerHomes, pageTitle: "Airbnb list", currentPage: "Home" })});
}

exports.getfavouritelist = (req, res, next) => {
       Favourite.getFavourite().then(favourites => {
favourites=favourites.map(fav=>
       fav.homeId
);
              Home.fetchAll().then(registerHomes=>{ 
              

                     const favouritewithDetails =  registerHomes.filter(home => favourites.includes(home._id.toString()));

                     res.render('store/favourite-list', { favouritewithDetails: favouritewithDetails, pageTitle: "Airbnb favourite-list", currentPage: "favourite-list" })
       
              }
       );
       });

}

exports.postAddtoFavourite = (req, res, next) => {
       console.log(req.body, "came to add to favourite");
       const homeId=req.params.id;
       const fav=new Favourite(homeId);
       fav.save().then(result=>{
              console.log("fav add",result)
       }).catch(err=>{
            console.log("error while marking favourite", err)
       }).finally(()=>{
          res.redirect("/favourites")     
       })

}
exports.getBookings = (req, res, next) => {
       res.render('store/bookings', { pageTitle: "My Bookings", currentPage: "bookings" });

}
exports.getHomesDetails = (req, res, next) => {
       const homeId = req.params.homeId;
       Home.findbyId(homeId).then(home => {
              // const home=homes[0]
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
   Favourite.deletebyId(homeId).then(result=>{
   }).catch(err=>{
          
                        console.log('error while removing from Favourite',error);

   })
.finally(()=>{

       res.redirect("/favourites");
})
       
   
}