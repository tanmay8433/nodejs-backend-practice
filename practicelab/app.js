// reuse the app from the last assignment 
// parse the body of the contact us request and log it console
// move to the code to separate local module and use the express router to import and use them in app.js
// move all the html code to html file and serve them using the file helper
// also add a 404 page for this app;
const path=require('path')
const express=require('express')
const contactusRouter = require('./routes/contactusRouter');
const homeRouter = require('./routes/homeRouter');
const rootDir=require("./utils/pathUtil")
const PORT = 3001;
const app=express();


app.use(express.urlencoded());
app.use(homeRouter)
app.use(contactusRouter)

app.use((req,res,next)=>{
  console.log("404")
    res.status(404).sendFile(path.join(rootDir,"views","404.html"))
})
app.listen(PORT, () => {
  console.log(`server runing on address http://locahost:${PORT}`)
});