
const Home = require("../models/home")

exports.getAddHome = (req, res, next) => {
       res.render("addHome", { pageTitle: "addHome", currentPage: "addHome" })
}
exports.postAddHome = (req, res, next) => {
       // console.log(req.body ,"postAddHome")
       const { houseName, price, location, rating, photoURl } = req.body;
       const home = new Home(houseName, price, location, rating, photoURl);
       home.Save()
       // registerHomes.push(req.body)
       res.render("homeAdded", { pageTitle: "successfully here", currentPage: "homeAdded" })
}

exports.getHomes = (req, res, next) => {
       const registerHomes = Home.fetchAll((registerHomes) => res.render('home', { registerHomes: registerHomes, pageTitle: "Airbnb Home", currentPage: "Home" }));

}
