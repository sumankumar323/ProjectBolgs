const express = require("express");
const router = express.Router();
const CowinController = require("../controllers/cowinController");
const WeitherController = require("../controllers/weitherController");
const MemeController = require("../controllers/memeController");
const UserController = require("../controllers/userController");
const mid = require("../middlewares/commonMiddlewares")

router.get("/test-me", function (req, res) {
  res.send("My first ever api!");
});
//COWIN API
router.get("/cowin/states", CowinController.getStates);
router.get("/cowin/districtsInState/:stateId", CowinController.getDistricts);
router.get("/cowin/getByPin", CowinController.getByPin);
router.post("/cowin/getOtp", CowinController.getOtp);
router.get("/cowin/getByDistrict", CowinController.getdistrictSessions);
//WETHER API
router.get("/weither", WeitherController.getWeatherAll);
router.get("/weithertemp", WeitherController.getWeatherTemp);
router.get("/weitherarr", WeitherController.arrangeByTemp);
//MEME API
router.get("/gatallmeme", MemeController.getAllMemes);
router.post("/creatememe", MemeController.createMeme);
//USER CREATE AND LOGIN
router.post("/users",UserController.createUser);
router.post("/login",UserController.loginUser);
router.get("/users/:userId",mid.middle1,UserController.getUserData);
router.put("/users/:userId",mid.middle1,mid.middle2,UserController.updateUser);
router.delete("/user/:userId",mid.middle1,mid.middle2,UserController.deleteUser);

module.exports = router;
