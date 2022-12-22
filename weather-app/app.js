const express = require("express");
const app = express();
const https = require("https");
//not functional
const url = "https://api.openweathermap.org/data/2.5/forecast?appid=7f96a06d060da0151de67a4980be55ce&q=College Station";

app.get("/", function(req,res){
    https.get(url, function(response){
        console.log(response);
        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
        });
    });
    res.send("Server is running")
})

app.listen(3000, function(){
    console.log("Server is running on port 3000.")
});