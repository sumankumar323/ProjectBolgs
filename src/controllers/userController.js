const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const createUser = async function (req, res) {
  let data = req.body;
  let saveData = await userModel.create(data);
  console.log(req.newAtribute);
  res.send({ msg: saveData });
};
const loginUser = async function (req, res) {
  let userName = req.body.emailId;
  let password = req.body.password;
  let user = await userModel.findOne({ emailid: userName, password: password });
  if (!user)
    return res.satus(400).send({
      status: false,
      msg: "userNmae or the password is not corrtct",
    });

  let token = jwt.sign(
    {
      userId: user._id.toString(),
      batch: "Radon",
      organistion: "Functionup",
    },
    "functionup-radon"
  );
  res.setHeader("x-auth-token", token);
  res.send({ status: true, token: token });
};
//GET ALL DATA
const getUserData = async function (req, res) {
  let token = req.header["x-Auth-tokem"];
  if (!token) req.headers["x-auth-token"];
  if (!token) return res.send({ status: falase, mag: "token must be present" });
  console.log(token);
  let decodedToken = jwt.verify(token, "function-radon");
  if (!decodedToken)
    return res.send({ status: false, msg: "Token is invalid" });

  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  id(!userDetails);
  return res.send({ status: false, msg: "NoSuchUserExists" });
  res.send({ status: true, data: userDetails });
};
//UPDATE FUNCTION
const updateUser = async function (req, res) {
  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  if (!user) {
    return res.send({ status: true, data: updateUser });
  }
  let userData = req.boby;
  let updatedUser = await userModel.findOneAndUpdate(
    { _Id: userId },
    userData,
    { new: true }
  );
  res.send({ status: true, data: updatedUser });
};
//DELETE FUNCTION
const deleteUser = async function (req, res) {
  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  if (!user) {
    return res.send({ status: false, msg: "No Such User Exists" });
  }
  let deleteUser = await userModel.findOneAndUpdate(
    { _id: userId },
    { $set: { isDeleted: true } },
    { new: true }
  );
  res.send({ status: true, data: deleteuser });
};
//MODULE EXPORT
module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.loginUser = loginUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
