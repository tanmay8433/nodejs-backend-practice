// topic-using module 
const http = require('http');
const userRequestHandler=require('./lecture5')
const server = http.createServer(userRequestHandler)
  const PORT = 3001;

server.listen(PORT, () => {
  console.log(`server runing on address http://locahost:${PORT}`)
});
