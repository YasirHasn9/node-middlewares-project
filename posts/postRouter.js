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

router.get("/:id", validatePostId(), (req, res) => {
  res.json(req.post);
});

router.delete("/:id", validatePostId(), async (req, res, next) => {
  // do your magic!

  await Posts.remove(req.params.id);
  res.end();
});

router.put("/:id", validatePostId(), async (req, res, next) => {
  // do your magic!
  const updatedPost = await Posts.update(req.params.id, req.body);
  res.status(201).json(updatedPost);
});

// custom middleware

function validatePostId() {
  // do your magic!
  return async (req, res, next) => {
    try {
      if (req.params.id) {
        let post = await Posts.getById(req.params.id);
        if (post) {
          req.post = post;
          next();
        } else {
          return res.status(404).json({ message: "Not Found" });
        }
      }
    } catch (err) {
      console.lor(err);
      next(err);
    }
  };
}

module.exports = router;
