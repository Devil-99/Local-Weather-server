const express = require('express');
const https = require('https');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();

app.get('/',(req,res)=>{
    res.send("home page");
});

app.post('/location',(req,res)=>{
    try{
        const {location} = req.body;
        const url = "https://api.openweathermap.org/data/2.5/weather?q="+location+"&units=metric&appid=4580466da90099b152f2a5bf0ec183c1";
        https.get(url, (response)=>{
            response.on('data',(data)=>{
                const weatherdata = JSON.parse(data);
                const processedData = {
                    "location":weatherdata.name,
                    "temperature":weatherdata.main.temp,
                    "feels_like":weatherdata.main.feels_like,
                    "humidity":weatherdata.main.humidity,
                    "clouds":weatherdata.clouds.all,
                    "wind_speed":weatherdata.wind.speed,
                    "country":weatherdata.sys.country,
                    "description":weatherdata.weather[0].description,
                    "visibility":weatherdata.visibility,
                    "status":weatherdata.weather[0].main
                };
                console.log(weatherdata);
                res.json(processedData);
            })
        });
    }
    catch(exp){
        console.log(exp);
    }
})

app.listen(process.env.PORT || process.env.SERVER_PORT, (err)=>{
    if(err)
        console.log("Page Fault -",err);
    else
        console.log("server is running on port ",process.env.SERVER_PORT);
})