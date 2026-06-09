
const { check, validationResult } = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res, next) => {
 res.render('auth/login', { 
    pageTitle: "Airbnb login", 
    currentPage: "login", 
    isLoggedIn: false,
    errors: [],        // <-- Pass empty array on first load
    oldInput: { email: '' }, 
    user:{},
  });

}

exports.postLogin= async (req, res,next) => {
const {email,password}=req.body;
 const user=await User.findOne({email:email});
 if(!user){
  
          return  res.status(422).render('auth/login',{
                  pageTitle:"login",
                  currentPage:'login',
                  isLoggedIn:false,
                  errors:["user doest not exist"],
                  oldInput:{email}
                  , 
    user:{}
            });
 }          
const match= await bcrypt.compare(password,user.password)
if(!match){

          return  res.status(422).render('auth/login',{
                  pageTitle:"login",
                  currentPage:'login',
                  isLoggedIn:false,
                  errors:["credentials not valid"],
                  oldInput:{email}
                  , 
    user:{}
            });
}
req.session.isLoggedIn=true;              
req.session.user=user;
await req.session.save()
 console.log("req.islogin",req.session.isLoggedIn)
 res.redirect('/')

};

exports.postLogout= (req, res,next) => {
  
        //  res.cookie("isLoggedIn",false);
       //   req.isLoggedIn=true;
//  res.redirect('/login')
 req.session.destroy(()=>{
  res.redirect("/login")
 })
};

exports.getSignup = (req, res, next) => {
res.render('auth/signup', { pageTitle: "Signup", currentPage: "signup" ,isLoggedIn:false,errors:[],oldInput:{firstName:"",lastName:"",email:"",userType:""}
, 
    user:{}
})
}

exports.postSignup= [
check("firstName") 
.notEmpty()
.withMessage('First name is required')
.trim()
.isLength({min:2})
.withMessage('First name must be at least 2 characters long')
.matches(/^[a-zA-Z\s]+$/)
.withMessage('First name can only contain letters'),

check("lastName") 
.matches(/^[a-zA-Z\s]*$/)
.withMessage('Last name can only contain alphabets'),
      

check("email")
.isEmail()
.withMessage("Please enter a valid email")
.normalizeEmail(),

check("password")
.isLength({min:8})
.withMessage('Password should be altest 8 characters long')
.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
.withMessage('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (e.g., !, @, #, $).')
.trim(),


check("confirmPassword") 
.trim()
.custom((value,{req})=>{
      console.log(value,"cvalue")
      if(value !== req.body.password){
            throw new Error('Passwords do not match');
      }
      return true;
}),

check("userType")
.notEmpty()
.withMessage('User type is required')
.isIn(['guest','host'])
.withMessage('Invalid user type'),


check('terms')
.notEmpty()
.withMessage('you must accept the terms and condition')
.custom((value,{req})=>{
      if(value !=='on'){
            throw new Error('you must accept the term and condition')
      }
      return true;
}),

(req, res,next) => {
      const { firstName,lastName,email, password ,userType} = req.body;
      const errors=validationResult(req);
      if(!errors.isEmpty()){
            return res.status(422).render('auth/signup',{
                  pageTitle:"signup",
                  currentPage:'singup',
                  isLoggedIn:false,
                  errors:errors.array().map(err=>err.msg),
                  oldInput:{firstName,lastName,email,password,userType}
                  , 
    user:{}
            });
      }
      bcrypt.hash(password,12)
      .then(hashPassword=>{
            const user=new User ({firstName,lastName,email,password:hashPassword,userType});
            return user.save();          
      }).then(()=>{
            res.redirect("/login");
      }).catch(err=>{
            res.status(422).render('auth/signup',{
                  pageTitle:"signup",
                  currentPage:'singup',
                  isLoggedIn:false,
                  errors:[err.message],
                  oldInput:{firstName,lastName,email,password,userType}
                  , 
    user:{}
            });
            })
   
}


];