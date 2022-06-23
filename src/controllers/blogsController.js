const authorModel = require("../models/authorModel");
const blogsModel = require("../models/blogsModel");

/*------------------------------------------------------------------------------------------
➡️ POST METHOD, CREATE NEW BLOG USING
------------------------------------------------------------------------------------------ */
const createBlogs = async function (req, res) {
  try {
    const data = req.body;
    if (Object.keys(data).length == 0) {
      // if body is empty then return "msg" body ka key agr zero hai to ye retrn krega
      return res.status(400).send({
        status: false,
        msg: "Post Body Data Required",
      });
    }
    //false statement
    if (!data) {
      return res
        .status(400)
        .send({ status: falase, msg: "Post Body Data Required" });
    }
    if (!data.authorId) {
      return res
        .status(400)
        .send({ status: false, msg: "AutherId is mandatory" });
    }
    if (!data.title) {
      return res.status(400).send({ status: false, msg: "Title is mandatory" });
    }
    if (!data.body) {
      return res
        .status(400)
        .send({ status: false, msg: "Body Data is mendatory" });
    }
    if (!data.category) {
      return res
        .status(400)
        .send({ status: false, msg: "Category is mendatory" });
    }
    const ValidAuthor = await authorModel.findById(data.authorId);
    if (!ValidAuthor) {
      return res.status(401).send({
        status: false,
        msg: "Invalid Author, please try with a valid AuthorId",
      });
    }

    const saveData = await blogsModel.create(data);
    res.status(201).send({ status: true, data: saveData });
  } catch (err) {
    res.status(400).send({ status: falase, msg: err.message });
  }
};

/*=======================================================================================================
➡️ GET METHOD, GET ALL LIST OF BLOGS
========================================================================================================*/
const getAllBlogs = async (req, res) => {
  try {
    let data = req.query;
    let query = {};

    if (Object.keys(data).length > 0) {
      if (data.tags) {
        data.tags = {
          $in: data.tags,
        };
      }

      if (data.subcategory) {
        data.subcategory = {
          $in: data.subcategory,
        };
      }

       query = data;
    }

    query.isDeleted = false;
    query.isPublished = true;

    const allBlogs = await blogsModel.find(query);

    if (allBlogs.length == 0) {
      return res.status(404).send({
        status: false,
        msg: "Blogs list not found",
      });
    }

    res.status(200).send({
      status: true,
      data: allBlogs,
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      msg: err.message,
    });
  }
};

/*=======================================================================================================
➡️ PUT METHOD, UPDATE BY BLOG ID AS PARAMS
==========================================================================================================*/
const updateBlogsById = async function (req, res) {
  try {
    let blogId = req.params.blogId;
    let data = req.body;
    if (Object.keys(data).length == 0)
      return res.status(400).send({
        status: false,
        msg: "Body is Required",
      });
    let blogData = await blogsModel.findOne({ _id: blogId, isDeleted: false });
    if (!blogData)
      return res.status(404).send({
        status: false,
        msg: "blogsId related data unavailable",
      });
    if (data.title) blogData.title = data.title;
    if (data.category) blogData.category = dat.category;
    if (data.body) blogData.body = data.body;
    if (data.tags) {
      if (typeof data.tags == "object") {
        blogData.tags.push(...data.tags);
      } else {
        blogData.tags.push(data.tags);
      }
    }
    if (data.subcategory) {
      if (typeof data.subcategory == "object") {
        blogData.subcategory.push(...data.subcategory);
      } else {
        blogData.subcategory.push(data.subcategory);
      }
    }
    blogData.publishedAt = Date();
    blogData.isPublished = true;
    blogData.save();
    res.status(200).send({
      status: true,
      data: blogData,
    });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

/*=======================================================================================================
➡️ DELETE METHOD, DELETE BY BLOG-iD AS PARAMS
==========================================================================================================*/

const deleteBlogsById = async function (req, res) {
  try {
    let blogId = req.params.blogId;
    let result = await blogsModel.findOne({
      _id: blogId,
      isDeleted: false,
    });
    if (!result)
      return res.status(404).send({
        status: false,
        msg: "User data not found",
      });
    let updated = await blogsModel.findByIdAndUpdate(
      {
        _id: blogId,
        isDeleted: false,
      },
      { isDeleted: true, deletedAt: Date() },
      { new: true }
    );
    res.status(200).send({ status: true, msg: "Deletion Successfull" });
    res.send({ status: true, data: updated });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

/*=======================================================================================================
➡️ DELETE METHOD, DELETE BY BLOG-iD AS PARAMS
========================================================================================================*/
const deleteBolgsByQuery = async function (req, res) {
  try {
    let data = req.query;
    let query = {};
    if (Object.keys(data).length == 0) {
      return res.status(400).send({
        status: false,
        msg: "No query params available",
      });
    } else {
      // ==> if tag defined
      if (data.tag) {
        data.tag = {
          $in: data.tag,
        };
      }
      // ==> if subcategory
      if (data.subcategory) {
        data.subcategory = {
          $in: data.subcategory,
        };
      }
      // ==> query structure
      query = {};
    }
    // ==>default query
    query.isDeleted = false;
    query.authorId = req.decodedToken.authorId;

    const available = await blogsModel.find(query).count();
    if (!available == 0) {
      return res.status(404).send({
        status: false,
        msg: "query data not found OR may be you are unauthorised to delete info",
      });
    }

    const deleteData = await blogsModel.updateMany(query, {
      $set: { isDeleted: true, deletedAt: deleteData },
    });
    res.status(200).send({ status: true, data: deleteData });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};
module.exports.createBlogs = createBlogs;
module.exports.deleteBlogsById = deleteBlogsById;
module.exports.getAllBlogs = getAllBlogs;
module.exports.updateBlogsById = updateBlogsById;
module.exports.deleteBolgsByQuery = deleteBolgsByQuery;
