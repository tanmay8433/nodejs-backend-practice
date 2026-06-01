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
// local module
const storeRouter=require('./routes/storeRouter')
const hostRouter = require('./routes/hostRouter');
const rootDir=require("./utils/pathUtil")


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
app.use(express.urlencoded());
app.use(storeRouter);
// comman path host
app.use("/host",hostRouter);

app.use(errorController.get404)

const DB_PATH="mongodb+srv://root:Qwerty%408433@completecoding.ndwpjkz.mongodb.net/airbnb?retryWrites=true&w=majority"
mongoose.connect(DB_PATH).then(()=>{
  console.log('Connected to Mongo')
  app.listen(PORT,()=>{
    console.log(`server runing on address http://locahost:${PORT}`)
  })
}).catch((err)=>{
  console.log("Error while connecting to MongoDB",err);
})