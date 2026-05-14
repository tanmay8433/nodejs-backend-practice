const sumrequestHandler=(req,res)=>{
console.log(req.url,req.Method,"sumrequsthandler in ")
const body=[];
      req.on("data",(chunk)=>{
        body.push(chunk)
      })
           req.on("end",()=>{
        const fullBody=Buffer.concat(body).toString();
        const params= new URLSearchParams(fullBody);
         const jsonObject=Object.fromEntries(params);
      
         const result=Number(jsonObject.first)+Number(jsonObject.second);
         console.log(result)
 res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>result calculator</title></head>');
    res.write(`
    <body>
      <h1>${result}</h1>
     
    </body>
  `);

    res.write('</html>');
    return res.end();
           });
}

exports.sumrequestHandler=sumrequestHandler;