require('dotenv').config();
const express = require('express');
const cors = require('cors');
const server = express();
const weathData = require('./data/weather.json');

server.use(cors());
// local ip address
//port

const PORT = process.env.PORT;

//http://localhost:3000/
server.get('/', (req, res) => {
  console.log("test home route");
  res.send('Hi from the home roure');
})
//http://localhost:3000/test
server.get('/test', (req, res) => {
  console.log("test route");
  res.send('Hi from the test roure');
})



//http://localhost:3000/weather
server.get('/weather', (req, res) => {
  let searchQuery = weathData.find((item) => {
    if (item.city_name == req.query.name) {
      return item;
    }
    // return true;
  })
  res.send(searchQuery);
})


// http://localhost:3000/getweathData?name=weatherCityName
server.get('/getweathData', (req, res) => {
  console.log(req.query.name);
  let weatherCityName = weathData.map((item) => {
    return item.city_name;
  })
  res.send(weatherCityName);
})

//http://localhost:3000/getweathData?

server.listen(PORT, () => {
  console.log(`Hello I am lisiting on ${PORT}`);
})


server.get("*", (req, res) => {
  res.send("eror 404");
})  
