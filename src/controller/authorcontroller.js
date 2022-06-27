const jwt = require("jsonwebtoken");
const authormodel = require("../model/authormodel");


//------------------*****CREATE AUTHOR CONTROLLER.*******.....................................-------

let createAuthor = async(req, res) => {
    try{
        let data = req.body
        if(Object.keys(data).length==0)
        {
         return   res.status(400).send({status:true, msg:"Data is required"})
        }
        if(!data.fname)  //Validation of 
        {
          return  res.status(400).send({status:true, msg:"fname is required"})
        }

        if(!data.lname)
        {
          return  res.status(400).send({status:true, msg:"lname is required"}) //not work properly when i give a space in json then it not give propely message otherthan ok
        }

        if(!data.title)
        {
          return  res.status(400).send({status:true, msg:"title is required"})
        }

        if(!data.email)
        {
          return  res.status(400).send({status:true, msg:"email is required"})
        }

        if(!data.password)
        {
         return   res.status(400).send({status:true, msg:"password is required"})
        }
        // if(!data)
        // {
        //     res.status(400).send({status:true, msg:"Data is required"})
        // }
        let created = await authormodel.create(data)

        res.status(201).send({status: true, data:created})

    }catch(err){
        console.log(err)
        res.status(500).send({status:false, msg: err.message})
    }
}
/////........--------***********___ Author LogIn ___**********...........--------->>>>>>>>>>>>>>>>>>>>>>>>>>

const authorLogin = async function(req,res)
{
  try {
    let email = req.body.email;
    let password = req.body.password;
    if (!email)
      return res.status(400).send({ status: false, msg: "please fill the email" });
    if (!password)
      return res.status(400).send({ status: false, msg: "please fill the password" });
    let findAuthor = await authormodel.findOne({ email: email, password: password});
    if (!findAuthor)
      return res.status(401).send({
        status: false,
        msg: "Email or Password not Valid",
      });

let token = jwt.sign({authorId: findAuthor._id.toString()}, "Group 16");
res.status(201).send({ status: true, data: token });
} catch (err) {
//console.log(error.message)
res.status(500).send({status: false, msg: err.message});
}
}

module.exports.authorLogin = authorLogin;
module.exports.createAuthor = createAuthor;