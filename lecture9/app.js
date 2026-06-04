// const http = require('http');
const express=require('express')
// const testingSyntax=require('./syntax')
// const testingRuntime=require('./runtime')
// const testingLogical=require('./logical')
const userRequestHandler=require("./user")
    const app=express();
  app.get("/",(req,res,next)=>{
    console.log("first middleware",req.url,req.method)
    //  res.send(`<p>come form first middleware</p>`)
    next()
  });
  app.post("/submit-details",(req,res,next)=>{
  console.log("second middleware",req.url,req.method)
  res.send(`<p>welcome to express</p>`)
});
    app.post("/",(req,res,next)=>{
    console.log("another middleware",req.url,req.method)
    res.send(`<p>come form another middleware</p>`)
    
  });
// const server = http.createServer(app);
const PORT = 3001;


app.listen(PORT, () => {
  console.log(`server runing on address http://locahost:${PORT}`)
});
