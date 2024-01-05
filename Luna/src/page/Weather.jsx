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
      case 'clear sky':
        return 'bg-gradient-to-bl from-cyan-300 from-10% to-blue-800 to-70%';
      case 'few clouds':
        return 'bg-gradient-to-bl from-cyan-300 from-10% to-blue-800 to-70%';
      case 'scattered clouds':
        return 'bg-gradient-to-bl from-cyan-300 from-10% to-blue-800 to-70%';
      case 'broken clouds':
        return 'bg-gradient-to-bl from-cyan-300 from-10% to-blue-800 to-70%';
        //Rain
      case 'shower rain':
        return 'bg-gradient-to-bl from-cyan-300 from-10% to-blue-800 to-70%';
      case 'rain':
        return 'bg-gradient-to-bl from-cyan-300 from-10% to-blue-800 to-70%';
      default:
        return 'bg-gradient-to-bl from-cyan-300 from-10% to-blue-800 to-70%';
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
          <div className='py-5'>
          <form onSubmit={handleSubmit}>
            <div className='flex rounded mx-auto justify-center mb-3'>
              <input
                type='text'
                placeholder='Search city'
                value={city}
                onChange={handleSearch}
                className='border-y border-l px-3 py-1 w-1/2 rounded-l-lg focus:outline-none focus:border-blue-400 shadow-lg'
              />
              <button type='submit' className='bg-blue-500 px-3 py-1 rounded-r-lg text-white hover:bg-blue-600 shadow-lg'>
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
                <div className='sm:p-10 md:px-28 px-20 p- text-white '>
                  <h2 className='sm:text-4xl text-3xl mb-4 sm:text-start text-center'>{weatherData.name}</h2>
                  <div className='grid sm:grid-cols-2'>
                    <div className='sm:order-2  mx-10 flex-col justify-center mb-3'>
                      <img src={`${getIconUrl(weatherData.weather[0].icon)}`} alt=""  className='w-20 h-20 mx-auto'/>
                      <p className={` sm:text-2xl text-center`}>{weatherData.weather[0].description}</p>
                    </div>
                    <p className='sm:order-1 text-center sm:text-8xl text-6xl flex justify-center items-center'>{weatherData.main.temp.toFixed()}°C</p>
                  </div>
                  <div className='grid sm:grid-cols-2 gap-4 mt-10 text-center bg-white bg-opacity-40 py-2 rounded'>
                    <p>Feels like : {weatherData.main.feels_like.toFixed()}°C</p>
                    <p>Humidity : {weatherData.main.humidity}%</p>
                    <p>Pressure : {weatherData.main.pressure}</p>
                    <p>Wind Speed : {weatherData.wind.speed}m/s</p>
                  </div>
                </div>
              </div>
            )
          )}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Weather;
