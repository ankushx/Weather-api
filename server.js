const express = require('express');
const axios = require('axios');
const cors = require('cors'); 

const app = express();
app.use(express.json());
app.use(cors());


// API endpoint to fetch weather for multiple cities
app.post('/getWeather', async (req, res) => {
  try {
    const { cities } = req.body;
    const weatherData = await getWeatherForCities(cities);
    console.log(weatherData);
    res.json({ weather: weatherData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// Function to fetch weather data for multiple cities
async function getWeatherForCities(cities) {
  const apiKey = '6ea03052b2af4f6cb0183330230306';
  const weatherData = {};

  for (const city of cities) {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
      );
      const { temp_c } = response.data.current;
      weatherData[city] = `${temp_c}C`;
    } catch (error) {
      console.error(`Failed to fetch weather for ${city}`);
      weatherData[city] = 'N/A';
    }
  }

  return weatherData;
}

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
