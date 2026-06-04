


exports.getLogin = (req, res, next) => {
       
 res.render('auth/login', { pageTitle: "Airbnb login", currentPage: "login" ,isLoggedIn:false})

}

exports.postLogin= (req, res,next) => {
  const { userName, password } = req.body;

  console.log(userName);
  console.log(password);
        //  res.cookie("isLoggedIn",true);
        req.session.isLoggedIn=true;
       //   req.isLoggedIn=true;
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