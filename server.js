require('dotenv').config();
const express = require('express');
const cors = require('cors');
const server = express();
const weather = require('./data/weather.json');

server.use(cors());

const PORT = process.env.PORT;

server.get('/weather',handleWeather);
server.use('*',(request, response) => response.status(404).send('Page not found'));

function handleWeather(request, response) {
  let {searchQuery,latitude,longitude} = request.query;
  

  const city = weather.find(city => city.city_name?.toLowerCase() === searchQuery?.toLowerCase());
  // console.log(city);

  try{
    const weatatherArray = city.data.map(day => new Forecast(day));
    // console.log(weatatherArray);
    response.status(200).send(weatatherArray);
  }catch(error) {
    errorHandler(error, response);
  }
}


class Forecast{
  constructor(day){
    this.date = day.valid_date
    this.description = day.weather.description  
  }
}


function errorHandler(error,response) {
  console.log(error);
  response.status(500).send('something went wrong');
}

server.listen(PORT, () => console.log(`listening on ${PORT}`));
