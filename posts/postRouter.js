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
    if (req.params.id) {
      return res.status(404).json({ message: "Not found" });
    }
    const post = await Posts.getById(req.params.id);
    res.json(post);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
