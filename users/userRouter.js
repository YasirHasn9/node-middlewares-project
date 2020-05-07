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

router.post("/", validateUser(), async (req, res, next) => {
  // do your magic!
  const newUser = await Users.insert(req.body);
  res.status(201).json(newUser);
});

router.get("/:id", validateUserId(), async (req, res) => {
  await res.json(req.user);
});

router.get(
  "/:id/posts",
  validateUserId(),
  validateUser(),
  async (req, res, next) => {
    // do your magic!
    try {
      const posts = await Users.getUserPosts(req.params.id);
      res.json(posts);
    } catch (err) {
      console.log("GET: :/posts", err);
      next(err);
    }
  }
);

router.post(
  "/:id/posts",
  validateUserId(),
  validatePost(),
  validateUser(),
  async (req, res, next) => {
    // do your magic!
    try {
      const newPost = await Posts.insert(req.body);
      return res.json(newPost);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", validateUserId(), validateUser(), async (req, res) => {
  // do your magic!
  try {
    await Users.remove(req.params.id);
    res.status(202).end();
  } catch (err) {
    next(err);
  }
});

router.put("/:id", validateUserId(), validateUser(), async (req, res) => {
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

function validateUser() {
  // do your magic!
  return async (req, res, next) => {
    try {
      if (req.body.name) {
        next();
      } else {
        return res.status(500).json({
          message: "There is no user"
        });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
}

function validatePost() {
  // do your magic!
  return async (req, res, next) => {
    try {
      if (!req.body.name) {
        return res.status(402).json({
          message: "Name should be filled in "
        });
      }
      const post = await Users.insert(req.body);
      if (post) {
        next();
      }
    } catch (err) {
      next(err);
    }
  };
}

module.exports = router;
