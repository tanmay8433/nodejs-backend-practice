// resue the app for last assignment
// add more field in add home page like price per night ,location,rating,photo.
// Design the home card to show all of this information 
// make the Selected tab active on top.
//  external modules
const path=require('path')
const express=require('express') 
// local module
const userRouter=require('./routes/userRouter')
const {hostRouter} = require('./routes/hostRouter');
const rootDir=require("./utils/pathUtil")
const PORT=3001;
const app=express();
app.use(express.static(path.join(rootDir,"public"))); 
app.use("/",(req,res,next)=>{
  console.log(req.url,req.method);
  next();
})

app.set("view engine","ejs");
app.set("views","views")
app.use(express.urlencoded());
app.use(userRouter);
// comman path host
app.use("/host",hostRouter);

app.use((req,res,next)=>{
//  res.status(404).send(`<p>page not found<p>`)
  // res.status(404).sendFile(path.join(__dirname,"./","views","404.html"))
  // or ussing file helper
    res.status(404).render("404",{pageTitle:"404 not found",currentPage:"404"})
})
app.listen(PORT,()=>{
  console.log(`server runing on address http://locahost:${PORT}`)
})