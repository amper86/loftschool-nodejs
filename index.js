const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

console.log(process.env.INTERVAL);

const server = http.createServer((req, res) => {
  // console.log(req.method);
  setTimeout(() => {
    console.info(`${Date()} - timeout`);
    clearInterval(interval);
    res.end(Date());
  }, process.env.TIMEOUT);

  let interval = setInterval(() => {
    console.info(`${Date()} - interval`);
  }, process.env.INTERVAL);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
