 //create a calculator 
// create a new Node.js project name calculator 
// on the home page (route '/') show a welcome msg and a link to cal page.
// on the "/calculator" page display a form with two ip fields and sum Button
// when the user clicks the sum button ,they should be taken the "/calculator-result" page,which show the sum of the to no

// make sure result goes to the Server
// create the separate module for the addtion function.
// create the another module to handle incoming request.
// on the "/calculator-result" page parse the user ip ,use the addition module to cal the sum ,and display the result to new html page


// lecture 5- Parsing request topics

const fs = require('fs');
const {sumrequestHandler}=require("./sum")
const requestHandler=(req, res) => {
 
  console.log(req.url, req.method)


  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Practice calculator</title></head>');
    res.write(`
    <body>
      <h1>welcome calculator</h1>
      <a href="/calculator">Calculator<a/>
    </body>
  `);

    res.write('</html>');
    return res.end();

  }
  
  else if(req.url==="/calculator"){
        res.setHeader('Content-Type', 'text/html');
    res.write('<  >');
    res.write('<head><title>calcuator page</title></head>');
    res.write(`
    <body>
      <form action="/calculate-result" method="POST">
        
       
        <input type="text" placeholder="first no" name="first" required>
        
        <br><br>

        <input type="text"  placeholder="second no" name="second" required>
        <br><br>

        <button type="submit">sum</button>

      </form>
    </body>
  `);

    res.write('</html>');
    return res.end();
  }
    else if (req.url.toLowerCase() === '/calculate-result' && req.method == 'POST') {
 return sumrequestHandler(req,res);
  
    }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Practice calculator</title></head>');
  res.write('<body><h1>page not found 404 </h1></body>');
  res.write('</html>');
  res.end();
};

exports.requestHandler=requestHandler;
