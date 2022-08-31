require('dotenv').config();
const express = require('express');
const cors = require('cors');
const server = express();
const weather = require('./data/weather.json');


server.use(cors());

const PORT = process.env.PORT || 3001;

server.use('*', (req,res) => res.status(404).send('page not found'));

server.get('/weather', (req, res) => {
  let {searchQuery,lat,lon} = req.query;

  const city = weather.find(city => city.city_name.toLocaleLowerCase() === searchQuery.toLocaleLowerCase());

  try
  {
    const weatherArray = city.data.find(day => new Forcast(day));
    res.status(200).send(weatherArray);
  }
  catch(error)
  {
    errorHandler(error, res);
  }

});

function Forcast(day) {
  this.date = day.valid_date
  this.description = day.wether.description
}

function errorHandler(error, res) {
  console.log(error);
  res.status(500).send('something went wrong');
}

server.listen(PORT, () => console.log(`listening on ${PORT}`));
