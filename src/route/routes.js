const express = require('express');
const router = express.Router();
const  authorcontroller = require("../controller/authorcontroller")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.post("/authors", authorcontroller.createAuthor)









module.exports = router;