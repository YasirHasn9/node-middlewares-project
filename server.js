const express = require("express");

const server = express();
server.use(express.json());
server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

function logger(req, res, next) {
  return (req, res, next) => {
    console.log(
      `
      Method: ${req.method}\n
        Url: ${req.url}\n
        Timestamp : ${new Date().toISOString()}}
      `
    );

    next();
  };
}

server.use(logger());

module.exports = server;
