
const Home = require("../models/home")

exports.getAddHome=(req,res,next)=>{
       res.render("host/edit-home",{pageTitle:"addHome",currentPage:"addHome",editing:false,isLoggedIn:req.isLoggedIn})
}
exports.getEditHome=(req,res,next)=>{
       const homeId=req.params.homeId;
       const editing=req.query.editing==='true';
       
        Home.findById(homeId).then(home => {
              if(!home){
                     console.log("Home not found for editing");
                     return res.redirect("/host/host-home-list")
              }
              console.log(homeId,editing,home,'check  ')
              
                     res.render("host/edit-home",{pageTitle:"edit your home",currentPage:"host-homes",editing:editing,home:home,isLoggedIn:req.isLoggedIn})

              
       })
}
exports.postAddHome=(req,res,next)=>{
       // console.log(req.body ,"postAddHome")
      const {houseName,price,location,rating,photoURl,description}=req.body;
  const home= new Home({houseName,price,location,rating,photoURl,description});
  home.save().then(()=>{
       console.log("home save successfully")
  });
        res.redirect("/host/host-home-list")
}

exports.getHostHomes=(req,res,next)=>{
        Home.find().then(registerHomes=>{
              
              res.render('host/host-home-list',{registerHomes:registerHomes,pageTitle:"Airbnb host home list",currentPage:"Host-Home-list",isLoggedIn:req.isLoggedIn})});
}
exports.postEditHome=(req,res,next)=>{
       // console.log(req.body ,"postAddHome")
      const {id,houseName,price,location,rating,photoURl,description}=req.body;
      Home.findById(id).then((home)=>{
         home.houseName = houseName;
    home.price = price;
    home.location = location;
    home.rating = rating;
    home.photoURl = photoURl;
    home.description=description;

home.save().then((result)=>{
       console.log("Home updated",result)
}).catch(err=>{
       console.log("Error while updateing",err)
})
 res.redirect("/host/host-home-list")
      }).catch(err=>{
       console.log("Error while finding home",err)
      })
//   const home= new Home(houseName,price,location,rating,photoURl,description,id);
//   home._id=id;
//   home.save()
       // registerHomes.push(req.body)
       // res.redirect("/host/host-home-list")
}

exports.postDeleteHome = async (req, res, next) => {
  try {
    const homeId = req.params.homeId;

    await Home.findByIdAndDelete(homeId);

    res.redirect("/host/host-home-list");
  } catch (err) {
    console.log("error while deleting", err);
  }
};