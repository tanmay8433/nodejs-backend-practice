
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
exports.getIndex=(req,res,next)=>{
       const registerHomes=Home.fetchAll((registerHomes)=> res.render('store/index',{registerHomes:registerHomes,pageTitle:"Airbnb home",currentPage:"index"}));
 
}

exports.getHomes=(req,res,next)=>{
       const registerHomes=Home.fetchAll((registerHomes)=> res.render('store/home-list',{registerHomes:registerHomes,pageTitle:"Airbnb list",currentPage:"Home"}));
}
 
exports.getfavouritelist=(req,res,next)=>{
       const registerHomes=Home.fetchAll((registerHomes)=> res.render('store/favourite-list',{registerHomes:registerHomes,pageTitle:"Airbnb favourite-list",currentPage:"favourite-list"}));
 
}
exports.getBookings=(req,res,next)=>{
        res.render('store/bookings',{pageTitle:"My Bookings",currentPage:"bookings"});
 
}
// exports.gethomedetails=(req,res,next)=>{
//         res.render('store/home-details',{pageTitle:"home details",currentPage:"home-details"});
 
// }
// exports.getreserve=(req,res,next)=>{
//         res.render('store/reserve',{pageTitle:"My reserve",currentPage:"reserve"});
 
// }