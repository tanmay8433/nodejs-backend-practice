// take your airbnb forward
// structure the views folder into  host and store and move the respective views files there
// add more views store like home list ,home-details,favourite-list,reserve,bookings,And to host view:edit-home ,host home list
// improve the header with navigation to all pages
// Register all the new routes and add dummy views there
// change controller to store and host setup.
// Add edit and delete buttons to the host-home-list view.
// keep the logic for Edit,delete,favourite pending


//  external modules
const path=require('path')
const express=require('express') 
const session=require('express-session')
const MongoDBStore=require('connect-mongodb-session')(session);
// local module
const storeRouter=require('./routes/storeRouter')
const hostRouter = require('./routes/hostRouter');
const authRouter = require('./routes/authRouter');
const rootDir=require("./utils/pathUtil")
const DB_PATH="mongodb+srv://root:Qwerty%408433@completecoding.ndwpjkz.mongodb.net/airbnb?retryWrites=true&w=majority"
const PORT=3001;
const app=express();
//local module
const errorController=require("./controllers/error");
// const {mongoConnect} = require('./utils/databaseUtil');
const { default: mongoose } = require('mongoose');


app.use(express.static(path.join(rootDir,"public"))); 
app.use("/",(req,res,next)=>{
  console.log(req.url,req.method);
  next();
})

app.set("view engine","ejs");
app.set("views","views")
const store=new MongoDBStore({
  uri:DB_PATH,
  collection:'sessions'
})

app.use(express.urlencoded());
app.use(session({
  secret:"secret",
  resave:false,
  saveUninitialized:true,
  store
})); 
app.use((req,res,next)=>{
// console.log(req.get("Cookie"),"get cookie")
     req.isLoggedIn=req.session.isLoggedIn;
    //  req.get('Cookie')? req.get('Cookie')?.split('=')[1]==="true":false;
    next();  
  });
app.use(authRouter);
app.use(storeRouter);
app.use("/host",(req,res,next)=>{
  if(!req.isLoggedIn){
return res.redirect("/login")
  }
  else{
    next();  
  }
});
// comman path host
app.use("/host",hostRouter);

app.use(errorController.get404)


mongoose.connect(DB_PATH).then(()=>{
  console.log('Connected to Mongo')
  app.listen(PORT,()=>{
    console.log(`server runing on address http://locahost:${PORT}`)
  })
}).catch((err)=>{
  console.log("Error while connecting to MongoDB",err);
})