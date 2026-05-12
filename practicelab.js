
// create the page that show a navigation bar of the myntra with the following links.clicking on the each link page should navigate to that page and a welcome to section text is shown there
const http = require('http');
const server = http.createServer((req, res) => {
 console.log(req.url, req.method)
 if(req.url==='/home'){
  res.write('<h1> welcome to home</h1>')
  return res.end();
 }
 else if(req.url==='/men'){
  res.write('<h1> welcome to men</h1>')
  return res.end();
 }
  else if(req.url==='/women'){
  res.write('<h1> welcome to women</h1>')
  return res.end();
 }
 else if(req.url==='/kids'){
  res.write('<h1> welcome to kinds</h1>')
  return res.end();
 }
 else if(req.url==='/cart'){
  res.write('<h1> welcome to cart</h1>')
  return res.end();
 }
  res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>complete coding</title></head>');
    res.write(`
   <html lang="en">
<head>
  <title>myntra</title>
</head>
<body>
  <head>
    <nav>
      <ul>
        <li><a href="/home">Home</a></li>
          <li><a href="/men">Men</a></li>
            <li><a href="/women">Women</a></li>
              <li><a href="/kids">Kinds</a></li>
                <li><a href="/cart">Carts</a></li>
      </ul>
    </nav>
  </head>
</body>
</html>
  `);
  res.end();
  });
const PORT = 3001;

server.listen(PORT, () => {
  console.log(`server runing on address http://locahost:${PORT}`)
});