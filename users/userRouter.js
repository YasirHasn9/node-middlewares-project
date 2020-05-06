const express = require("express");
const Users = require("./userDb");
const Posts = require("../posts/postDb");
const router = express.Router();

router.get("/", async (req, res, next) => {
  // do your magic!
  try {
    // get all the users
    const users = await Users.get();
    res.json(users);
  } catch (err) {
    next(err);
  }
});
router.post("/", async (req, res, next) => {
  // do your magic!
  try {
    const newUser = await Users.insert(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    console.log("Users:POST", err);
    next(err);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const user = await Users.getById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.get("/:id/posts", async (req, res, next) => {
  // do your magic!
  try {
    const user = await Users.getById(req.params.id);
    if (user) {
      const posts = await Users.getUserPosts(req.params.id);
      res.json(posts);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (err) {
    console.log("GET: :/posts", err);
    next(err);
  }
});
router.post("/:id/posts", async (req, res, next) => {
  // do your magic!
  try {
    // check the user
    const user = await Users.getById(req.params.id);
    if (user) {
      const newPost = await Posts.insert(req.body);
      return res.json(newPost);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res) => {
  // do your magic!
  try {
    // check the user
    const user = await Users.getById(req.params.id);
    if (user) {
      await Users.remove(req.params.id);
      res.status(202).end();
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (err) {
    next(err);
  }
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
