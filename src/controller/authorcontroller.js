const jwt = require("jsonwebtoken");
const userModel = require("../model/authormodel");


let createAuthor = async(req, res) => {
    try{
        let data = req.body
        if(!data)
        {
            res.status(400).send({status:true, msg:"Data is required"})
        }
        let created = await authorModel.create(data)
        res.status(201).send({status: true, data:created})


    }catch(err){
        console.log(err)
        res.status(500).send({status:false, msg: err.message})
    }
}



module.exports.createAuthor = createAuthor;