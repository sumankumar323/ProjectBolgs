const axios = require("axios")

let getWeatherAll = async function (req, res) {
    try {
        let city = req.query.q;
        let appid = req.query.appid;
        var option = {
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}`
        }
        let result = await axios(option)
        res.status(200).send({ msg: result.data }) //get all data of city
    }
    catch (error) {
        res.status(500).send({ msg: error.message })
    }
}

let getWeatherTemp = async function (req, res) {
    try {
        let city = req.query.q;
        let appid = req.query.appid;
        var option = {
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}`
        }
        let result = await axios(option)
        res.status(200).send({ msg: result.data.main.temp }) //get only temp of city
    }
    catch (error) {
        res.status(500).send({ msg: error.message })
    }
}

let arrangeByTemp = async function (req, res) {
    try {
        let cities = ["Bengaluru", "Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"];
        let cityArr = [];
        for (let i = 0; i < cities.length; i++) {            
            var option = {
                method: "get",
                url: `http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=0d90445a8b2d6656ed6ad75e967825a8`
            }
            result = await axios(option)                         
            cityArr[i] = { city: result.data.name, temp: result.data.main.temp }
        }
        let output = cityArr.sort((a, b) => (a.temp - b.temp))
        console.log(output)
        res.status(200).send({ msg: output })
    }
    catch (error) {
        res.status(500).send({ msg: error.message })
    }
}

module.exports.getWeatherAll = getWeatherAll;
module.exports.getWeatherTemp = getWeatherTemp;
module.exports.arrangeByTemp = arrangeByTemp;