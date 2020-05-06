const express = require("express");
const Users = require("./userDb");
const router = express.Router();

router.post("/", async (req, res, next) => {
  // do your magic!
});

router.post("/:id/posts", (req, res) => {
  // do your magic!
});

router.get("/", async (req, res, next) => {
  // do your magic!
  try {
    // get all the users
    const users = await Users.get();
    res.json(users);
  } catch (err) {
    // err handler for GET
    next(err);
  }
});

router.get("/:id", (req, res) => {
  // do your magic!
});

router.get("/:id/posts", (req, res) => {
  // do your magic!
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
