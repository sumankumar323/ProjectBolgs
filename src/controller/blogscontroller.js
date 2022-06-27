const blogsmodel = require("../model/blogsmodel");
const authormodel=require("../model/authormodel")
const jwt = require("jsonwebtoken");

//-------........******create blogs*********............---------------

const createBlog = async function (req, res){
  try{
    let data = req.body;
    if(Object.keys(data).length ==0)
    {return res.status(400).send({ status: false , msg: "Data is must be present" });
  }
// if(!data){
//   return res.status(400).send({status: false , msg: "data is mandatory"});
// }
if(!data.authorId){
  return res.status(400).send({status: false , msg: "authorid is mandatory"});
}

if(!data.title){
  return res.status(400).send({status: false , msg: "title is mandatory"});
}
if (!data.category) {
  return res
    .status(400)
    .send({ status: false, msg: "Category is mendatory" });
}
const ValidAuthor = await authormodel.findById(data.authorId);
if (!ValidAuthor) {
  return res.status(404).send({
    status: false,
    msg: "Invalid Author, Please try with a valid AuthorId",
  });
}

const saveData = await blogsmodel.create(data);
res.status(201).send({ status: true, data: saveData });
}

catch(err){
  console.log(err)
  res.status(500).send({status:false, msg: err.message})
}
}

//.........---------*****get list of blogs *******-----------------............

const getBlogs=async(req,res)=>{
  try {
    let data = req.query;   
    data.isDeleted = false;
    data.isPublished = true;
    const allBlogs = await blogsmodel.find(data);
    if (allBlogs.length == 0) {
      return res.status(404).send({ status: false, msg: "Blogs list not found"});
    }
    res.status(200).send({ status: true, data: allBlogs});
  }
   catch (err) {
    res.status(500).send({ status: false, msg: err.message});
  }
};

//>>>>>>>>>>>>..........*****update blogs********..........>>>>>>> 

const updateBlog = async (req, res)=> {
  try{
    let blogData=req.body
    if (Object.keys(blogData).length==0) {return res.status(404).send({status:false,msg:"No Data Entered"}); }

    let blogId = req.params.blogId;
     if (!blogId) { return res.status(404).send({status:false,msg:"No Blog Id Entered"}); }
//
    let updatedBlog = await blogsmodel.findOneAndUpdate(
        {_id:blogId,isDeleted:false},
        {
          $push:{tags:blogData.tags,subcategory:blogData.subcategory},
          $set:{body:blogData.body,title:blogData.title,category:blogData.category, publishedAt:Date(),isPublished:true} },{new:true});

  if(blogData.tags && blogData.body && blogData.title && blogData.category && blogData.subcategory ){blogData.tags=updatedBlog.tags , blogData.body=updatedBlog.body, blogData.title=updatedBlog.title , blogData.category=updatedBlog.category, blogData.subcategory=updatedBlog.subcategory }
  else
  {return res.status(404).send({status:false,msg:"wrong object key entered"});}

          if (!updatedBlog) { return res.status(400).send({status:false,msg:"unable To Save Blog Data"}); }
    res.status(200).send({ status: true, data:updatedBlog});
}
catch(err) {res.status(500).send({status:false,msg:err.message})}
}

  //...........***deleteblogs by Id******......................---------

  const deleteBlogById = async (req, res) =>{    
   try{ 
    let blogId = req.params.blogId

    if(Object.keys(blogId).length==0) {
      return res(404).send({status: false, message: "blogId is not exists"})
  }
  let deletedBlog = await blogsmodel.findOneAndUpdate({_id: blogId,isDeleted:false}, {isDeleted: true}, {new: true})
  res.status(200).send({status: true, data: "blogs is deleted"})
   if(!deletedBlog) {
        return res(404).send({status: false, message: "no such blog exists"})
    } 
  } 
  catch(error){res.status(500).send({status:false,msg:err.message})}
}



  // ................****/blogs?queryParams..*********..........


  const deleteBlogByQueryParams= async (req, res)=> {    
    try{ let data = req.query;

      if (data.authorId) {
        if (data.authorId != req.decodedToken.authorId)
          return res.status(401).send({
            status: false,
            msg: "authorId is not valid",
          });
      }
      if (Object.keys(data).length == 0) {
        return res.status(400).send({
          status: false,
          msg: "no query params available ",
        });
      }
  
      data.isDeleted = false;
  
      const deleteData = await blogsmodel.updateMany(data, {
        $set: {
          isDeleted: true,
          deletedAt: Date(),
        },
      });
      if (!deleteData) {
        return res.status(404).send({
          status: false,
          msg: "query data not found ",
        });
      }
  
      res.status(200).send({
        status: true,
       // data: deleteData,
        msg: "data not found",  //not handle it show message always data not found if data is deleted if not then also sho same msg
      });
      console.log(deleteData);
    } catch (error) {
      res.status(500).send({
        status: false,
        msg: error.message,
      });
    }
  };
  

  module.exports.createBlog = createBlog;
  module.exports.getBlogs = getBlogs;
  module.exports.updateBlog = updateBlog;
  module.exports.deleteBlogById = deleteBlogById;
  module.exports.deleteBlogByQueryParams = deleteBlogByQueryParams;
