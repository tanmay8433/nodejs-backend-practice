//  external modules
const path=require('path')
const express=require('express') 
const cors=require('cors')
const { default: mongoose } = require('mongoose');

const DB_PATH="mongodb+srv://root:Qwerty%408433@completecoding.ndwpjkz.mongodb.net/todo?retryWrites=true&w=majority"
const todoItemsRouter = require('./routes/todoItemsRouter');
const errorController=require("./controllers/error");

const app=express();

app.use(express.urlencoded());

app.use(express.json());
app.use(cors());
app.use("/api/todo",todoItemsRouter);
app.use(errorController.get404);


const PORT=3001;
mongoose.connect(DB_PATH).then(()=>{
  console.log('Connected to Mongo')
  app.listen(PORT,()=>{
    console.log(`server runing on address http://locahost:${PORT}`)
  })
}).catch((err)=>{
  console.log("Error while connecting to MongoDB",err);
})