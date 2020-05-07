const express = require("express");
const helmet = require("helmet");
const usersRouter = require("./users/userRouter");
const userRouter = require("./posts/postRouter");
const server = express();
server.use(express.json());
server.use(helmet());


function logger() {
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
server.use("/users", usersRouter);
server.use("/posts", userRouter);

module.exports = server;
