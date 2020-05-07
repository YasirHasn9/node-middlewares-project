const express = require("express");
const Posts = require("./postDb");

const router = express.Router();

router.get("/", async (req, res, next) => {
  // do your magic!
  try {
    const posts = await Posts.get();
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  // do your magic!
  try {
    if (!req.params.id) {
      return res.status(404).json({ message: "Not found" });
    }
    const post = await Posts.getById(req.params.id);
    if (post) {
      res.json(post);
      next();
    } else {
      res.status(404).json({ message: "Post not Found" });
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  // do your magic!
  try {
    if (!req.params.id) {
      return res.status(404).json({ message: "Not found" });
    }
    await Posts.remove(req.params.id);
    res.end();
    next();
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  // do your magic!
  try {
    if (!req.params.id) {
      return res.status(404).json({ message: "Not found" });
    }
    const post = await Posts.getById(req.params.id);
    if (post) {
      const updatedPost = await Posts.update(req.params.id, req.body);
      res.status(201).json(updatedPost);
      next();
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (err) {
    next(err);
  }
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
