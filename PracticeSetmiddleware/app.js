// create the new project

// install the nodemon and express
// add two dummy middleware and logs its req path, method
// add third middleware to send a res
// now add handling two more middleware that handling path "/" and "/contact-us" page
// contact us should return a form with name and email and input field submit a "/contact us"page
// also hanlde post incoming request to /contactus path using a sep middleware

const express=require('express')
const PORT = 3001;

const app=express();
app.use((req,res,next)=>{
  console.log("first middleware",req.url,req.method)
  next()
})
app.use((req,res,next)=>{
  console.log("second middleware",req.url,req.method)
  next()
})
// app.use((req,res,next)=>{
//   console.log("third middleware",req.url,req.method)
//   res.send(`<p>welcome to home page</p>`)
// })

app.get("/",(req,res,next)=>{
  console.log("handle / for get",req.url,req.method)
  res.send(`<p>welcome to home page</p>`)
})
app.get("/contact-us",(req,res,next)=>{
  console.log("/contact-us middleware",req.url,req.method);
res.send(`<p>welcome to contactus page</p>
  <form action="/contact-us" method="POST">
  <input text="text" name="name" placeholder="enter the name"/>


   <input text="email" name="email" placeholder="enter the email"/>
   <input type="Submit"/>
  </form>
  `)
})
app.post("/contact-us",(req,res,next)=>{
  console.log("handle /contact-us for post",req.url,req.method)
  res.send(`<p>submit success</p>`)
})
app.listen(PORT, () => {
  console.log(`server runing on address http://locahost:${PORT}`)
});