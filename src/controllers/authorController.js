const jwt = require("jsonwebtoken");
const authorModel = require("../models/authorModel");
const validator = require("email-validator");

const createAuthor = async function (req, res) {
  try {
    let data=req.body;

    //false statement

    if (!data.fname)
      return res
        .status(400)
        .send({ status: false, msg: "First Name Must Be Required" });
    if (!data.lname)
      return res
        .status(400)
        .send({ status: false, msg: "Last Name Must Be Required" });
    if (!data.title)
      return res
        .status(400)
        .send({ status: false, msg: "Title Must Be Required" });
    if (!validator.validate(data.email))//validator use of packege  
      return res.status(400).send({ status: false, msg: "Email is invalid" });
    if (!data.email)
      return res
        .status(400)
        .send({ status: false, msg: "Email Must Be Required" });

    if (!data.password)
      return res
        .status(400)
        .send({ status: false, msg: "Password Must Be Required" });

    const saveData = await authorModel.create(data);
    if (!saveData)
      return res.status(500).send({
        status: false,
        data: "Can't save Your Data Something went wrong",
      });

    res.status(201).send({ status: true, data: saveData });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ status: false, msg: err.message });
  }
};
const authorLogin = async function (req, res) {
  try {
    let email = req.body.email;
    let password = req.body.password;
    if (!email)
      return res.status(400).send({ status: false, msg: "Email Not Present" });
    if (!password)
      return res
        .status(400)
        .send({ status: false, msg: "Password Not Present" });
    let findAuthor = await authorModel.findOne({
      email: email,
      password: password
    });

    if (!findAuthor)
      return res.status(401).send({
        status: false,
        msg: "Email Or Password not Valid",
      });
    /*------------------------------------------------------------------------------------------------------
         ➡️  ✍️ jwt.sign Token creation
--------------------------------------------------------------------------------------------------------*/

    let token = jwt.sign(
      {
        authorId: findAuthor._id.toString(),

      },
      "Group 16"
    );
    res.status(201).send({ status: true, data: token });
  } catch (err) {
    //console.log(error.message)
    res.status(500).send({
      status: false,
      msg: err.message,
    });
  }
};

module.exports.createAuthor = createAuthor;
module.exports.authorLogin = authorLogin;
