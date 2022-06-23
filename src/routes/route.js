const express = require("express");

const router = express.Router();

const authorController = require("../controllers/authorController");
const blogsController = require("../controllers/blogsController");
const {authentication,authorization,} = require("../middlewares/authorization");

// create author
router.post("/authors", authorController.createAuthor);

//create post login with jwt token as output
router.post("/login", authorController.authorLogin);

// create blogs
router.post("/blogs", authentication, blogsController.createBlogs);

// get all blogs by query
router.get("/blogs", authentication, blogsController.getAllBlogs);

// update blogs by query
router.put("/blogs/:blogId",authentication,authorization,blogsController.updateBlogsById);
//
//// delete by id
router.delete("/blogs/:blogId",authentication,authorization,blogsController.deleteBlogsById);

// delete by query
router.delete("/blogs", authentication,blogsController.deleteBolgsByQuery);

// if api is invalid OR wrong URL
router.all("/**", function (req, res) {
  res.status(404).send({
    status: false,
    msg: "The api you request is not available",
  });
});

module.exports = router;
