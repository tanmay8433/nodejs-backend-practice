
const Home = require("../models/home")

exports.getAddHome=(req,res,next)=>{
       res.render("host/addHome",{pageTitle:"addHome",currentPage:"addHome"})
}
exports.postAddHome=(req,res,next)=>{
       // console.log(req.body ,"postAddHome")
      const {houseName,price,location,rating,photoURl}=req.body;
  const home= new Home(houseName,price,location,rating,photoURl);
  home.Save()
       // registerHomes.push(req.body)
       res.render("host/homeAdded",{pageTitle:"successfully here",currentPage:"homeAdded"})
}

exports.getHostHomes=(req,res,next)=>{
       const registerHomes=Home.fetchAll((registerHomes)=> res.render('host/host-home-list',{registerHomes:registerHomes,pageTitle:"Airbnb host home list",currentPage:"Host-Home-list"}));
}
exports.postEditHome=(req,res,next)=>{
       // console.log(req.body ,"postAddHome")
      const {houseName,price,location,rating,photoURl}=req.body;
  const home= new Home(houseName,price,location,rating,photoURl);
  home.Save()
       // registerHomes.push(req.body)
       res.render("host/homeAdded",{pageTitle:"successfully here",currentPage:"homeAdded"})
}
