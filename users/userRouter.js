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
router.get("/:id", validateUserId(), (req, res) => {
  res.json(req.user);
});

router.get("/:id/posts", validateUserId(), async (req, res, next) => {
  // do your magic!
  try {
    const posts = await Users.getUserPosts(req.params.id);
    res.json(posts);
  } catch (err) {
    console.log("GET: :/posts", err);
    next(err);
  }
});

router.post("/:id/posts", validateUserId(), async (req, res, next) => {
  // do your magic!
  try {
    const newPost = await Posts.insert(req.body);
    return res.json(newPost);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", validateUserId(), async (req, res) => {
  // do your magic!
  try {
    await Users.remove(req.params.id);
    res.status(202).end();
  } catch (err) {
    next(err);
  }
});

router.put("/:id", validateUserId(), async (req, res) => {
  // do your magic!
  try {
    const updatedUser = await Users.update(req.params.id, req.body);
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
});

//custom middleware

function validateUserId() {
  // do your magic!
  return async (req, res, next) => {
    try {
      let user = await Users.getById(req.params.id);
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).json({ message: "Not Found" });
      }
    } catch (err) {
      console.lor(err);
      next(err);
    }
  };
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
