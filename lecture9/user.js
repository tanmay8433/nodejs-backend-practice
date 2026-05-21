// lecture 5- Parsing request topics

const fs = require('fs');
const userRequestHandler=(req, res) => {
  // console.log(req)
  console.log(req.url, req.method)
  // event loop exit
  // process.exit();

  // res.setHeader('Content-Type','json');

  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>complete coding</title></head>');
    res.write(`
    <body>
      <h1>Enter Your Details</h1>

      <form action="/submit" method="POST">
        
        <label for="name">Name:</label>
        <input type="text" id="name" name="username" required>
        
        <br><br>

        <label>Gender:</label>

        <input type="radio" id="male" name="gender" value="Male">
        <label for="male">Male</label>

        <input type="radio" id="female" name="gender" value="Female">
        <label for="female">Female</label>

        <br><br>

        <button type="submit">Submit</button>

      </form>
    </body>
  `);

    res.write('</html>');
    return res.end();

  }
  else if (req.url.toLowerCase() === '/submit' && req.method == 'POST') {

// lecture 5- chunk
const body=[];
    req.on("data",(chunk)=>{
      console.log(chunk);
      body.push(chunk)
    })
    //  lecture 5- buffer 
    req.on("end",()=>{
      const fullBody=Buffer.concat(body).toString();
      console.log(fullBody)
      // lecture 5- parsing request 
      const params= new URLSearchParams(fullBody);
//       const jsonObject={};
// for([key,val] of params.entries()){
// jsonObject[key]=val;
// }
// optimize solution 
const jsonObject=Object.fromEntries(params)
console.log(jsonObject)
fs.writeFileSync('user-details.text', JSON.stringify(jsonObject))
    })
    // 302 means redirection
    res.statusCode = 302;
    res.setHeader('Location', '/')
    return res.end();

  }
  else if (req.url === '/products') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>complete coding</title></head>');
    res.write('<body><h1>Products</h1></body>');
    res.write('</html>');
    return res.end();

  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>complete coding</title></head>');
  res.write('<body><h1>Like / share / subscribe </h1></body>');
  res.write('</html>');
  res.end();
};

module.exports=userRequestHandler;
