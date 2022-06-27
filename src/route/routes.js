const express = require('express');
const router = express.Router();
const  authorcontroller = require("../controller/authorcontroller")
const blogscontroller =require("../controller/blogscontroller")
const middleware=require("../middleware/auth")
 

router.post("/authors", authorcontroller.createAuthor)

router.post("/blogs", middleware.authentication , blogscontroller.createBlog) //create blogs

router.get("/blogs", middleware.authentication, blogscontroller.getBlogs)  //get blogs 

router.put("/blogs/:blogId", middleware.authentication, middleware.authorization, blogscontroller.updateBlog) //update data by id


router.delete("/blogs/:blogId", middleware.authentication, middleware.authorization, blogscontroller.deleteBlogById)

router.delete("/blogs", middleware.authentication , blogscontroller.deleteBlogByQueryParams)

router.post("/login",  authorcontroller.authorLogin)



module.exports = router;