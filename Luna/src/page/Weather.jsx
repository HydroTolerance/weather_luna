import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('Valenzuela');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lat=44.34&lon=10.99&units=imperial&appid=a7dead705dedbe4e0d9278728332744b`;

  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      setWeatherData(response.data);
      setLoading(false);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  const getColorText = (description) => {
    switch (description) {
      case 'few clouds':
        return 'bg-blue-500';
      default:
        return '';
    }
  };
  const getIconUrl = (icon) => {
    return `http://openweathermap.org/img/w/${icon}.png`
  }
  return (
    <div className={`h-screen flex items-center justify-center flex-col ${getColorText(weatherData?.weather[0]?.description)}`}>
      <div>
        <div className='sm:flex sm:justify-between text-center mx-4 mb-4 text-white'>
          <div className=''>
            <p className='text-2xl font-bold'>LUNA</p>
          </div>
          <div>
            <p>Weather</p>
          </div>
        </div>
        <div className='shadow-lg border-2 rounded-2xl '>
          <form onSubmit={handleSubmit}>
            <div className='flex rounded mb-2 mx-auto justify-center'>
              <input
                type='text'
                placeholder='Search city'
                value={city}
                onChange={handleSearch}
                className='border-y border-l px-3 py-1 w-40 rounded-l-lg focus:outline-none focus:border-blue-400'
              />
              <button type='submit' className='bg-blue-500 px-3 py-1 rounded-r-lg text-white hover:bg-blue-600'>
                Search
              </button>
            </div>
          </form>

          {loading ? (
            <div className='flex items-center justify-center'>
              <img src='https://media.tenor.com/SH31iAEWLT8AAAAj/pikachu-running.gif' alt='' />
              <p className='text-center my-3 ml-12 text-xl'>Loading ...</p>
            </div>
          ) : (
            weatherData && (
              
              <div className='flex justify-between '>
                {/* For displaying weather */}
                <div className='sm:p-16 md:p-28 p-10 text-white'>
                  <h2 className='text-4xl mb-3'>{weatherData.name}</h2>
                  <h2 className='text-4xl mb-3'>{weatherData.weather.icon}</h2>
                  <div className='flex'>
                    <p className='text-center text-8xl'>{weatherData.main.temp.toFixed()}°C</p>
                    <div className='flex items-end'>
                      <p className={`text-nowrap`}>{weatherData.weather[0].description}</p>
                    </div>
                  </div>

                  <p>Feels like : {weatherData.main.feels_like.toFixed()}°C</p>
                  <p>Humidity : {weatherData.main.humidity}%</p>
                  <p>Pressure : {weatherData.main.pressure}</p>
                  <p>Wind Speed : {weatherData.wind.speed}m/s</p>
                </div>

                <div className='flex justify-center'>
                  {/* For Icon to display the Icon */}
                  <img src={`${getIconUrl(weatherData.weather[0].icon)}`} alt=""  className='w-20 h-20'/>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Weather;
