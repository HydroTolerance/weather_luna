import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('Valenzuela');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setloading] = useState(true)

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lat=44.34&lon=10.99&units=imperial&appid=a7dead705dedbe4e0d9278728332744b`;
  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      setWeatherData(response.data);
      setloading();
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (e) => {
    setCity(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData()
  }
  const getColorText = (description) => {
    switch (description) {
      case "broken clouds":
        return "text-orange-500";
    }
  };
  return (
    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <div className='shadow-lg p-10 border-2 rounded-sm'>
          <form onSubmit={handleSubmit}>
            <div className='flex rounded mb-2 mx-auto justify-center'>
              <input type="text" placeholder="Search city" value={city} onChange={handleSearch} className='border-y border-l px-3 py-1 w-40 rounded-l-lg focus:outline-none focus:border-blue-400'/>
              <button type="submit" className='bg-blue-500 px-3 py-1 rounded-r-lg text-white hover:bg-blue-600'>Search</button>
            </div>
          </form>

        {loading ? (
            <div className="fixed top-72 left-1/2 mx-auto">
              <img src="https://media.tenor.com/SH31iAEWLT8AAAAj/pikachu-running.gif" alt="" />
              <p className="text-center my-3 ml-12 text-xl">Loading ...</p>
            </div>
          ) : (
          <>
          <div className='p-10'>
            <h2 className='text-4xl mb-3'>{weatherData.name}</h2>
            <div className='flex justify-bottom'>
              <p className='text-center text-8xl'>{weatherData.main.temp.toFixed()}°C</p>
              <p className={`${getColorText(weatherData.weather[0].description)}`}>{weatherData.weather[0].description}</p>
            </div>

            <p >Feels like : {weatherData.main.feels_like.toFixed()}°C</p>
            <p>Humidity : {weatherData.main.humidity}%</p>
            <p>Pressure : {weatherData.main.pressure}</p>
            <p>Wind Speed : {weatherData.wind.speed}m/s</p>
          </div>


          </>
          )}
      </div>
    </div>
  );
};

export default Weather;