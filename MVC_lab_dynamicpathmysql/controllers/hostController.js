
const Home = require("../models/home")

exports.getAddHome=(req,res,next)=>{
       res.render("host/edit-home",{pageTitle:"addHome",currentPage:"addHome",editing:false})
}
exports.getEditHome=(req,res,next)=>{
       const homeId=req.params.homeId;
       const editing=req.query.editing==='true';
       
        Home.findbyId(homeId).then(([home]) => {
              if(!home){
                     console.log("Home not found for editing");
                     return res.redirect("/host/host-home-list")
              }
              console.log(homeId,editing,home,'check  ')
              
                     res.render("host/edit-home",{pageTitle:"edit your home",currentPage:"host-homes",editing:editing,home:home})

              
       })
}
exports.postAddHome=(req,res,next)=>{
       // console.log(req.body ,"postAddHome")
      const {houseName,price,location,rating,photoURl,description}=req.body;
  const home= new Home(houseName,price,location,rating,photoURl,description);
  home.Save()
       // registerHomes.push(req.body)
       // res.render("host/homeAdded",{pageTitle:"successfully here",currentPage:"homeAdded"})
        res.redirect("/host/host-home-list")
}

exports.getHostHomes=(req,res,next)=>{
        Home.fetchAll().then(([registerHomes])=>{
              
              res.render('host/host-home-list',{registerHomes:registerHomes,pageTitle:"Airbnb host home list",currentPage:"Host-Home-list"})});
}
exports.postEditHome=(req,res,next)=>{
       // console.log(req.body ,"postAddHome")
      const {id,houseName,price,location,rating,photoURl,description}=req.body;
  const home= new Home(houseName,price,location,rating,photoURl,description);
  home.id=id;
  home.Save()
       // registerHomes.push(req.body)
       res.redirect("/host/host-home-list")
}

exports.postDeleteHome=(req,res,next)=>{
       const homeId=req.params.homeId;

Home.deletebyId((homeId).then(()=>{
       res.redirect("/host/host-home-list");
}).catch((err)=>{      
console.log('error while deleting',err)
})
)
}