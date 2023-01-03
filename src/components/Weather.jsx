import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Weather = () => {

    const [weather, setWeather] = useState({}); 

    useEffect(() => {
        
        function success(pos) {
            const crd = pos.coords;
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=ab3664d472dd9a911301e927f64427d4`)
                .then(res => setWeather(res.data));


            console.log('Your current position is:');
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);
          }
          
          function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
          }
          
          navigator.geolocation.getCurrentPosition(success, error);
    }, [])

    console.log(weather)

    const [isCelcius, setIsCelcius] = useState(true)

    const celcius = weather.main?.temp - 275.15;
    const n = celcius.toFixed(1)
    const fahrenheit = n * 1.8 + 32; 

    const changeUnits = () => {
        setIsCelcius(!isCelcius)
    }

    return (
        <div className='card'>
            <h1>Weather App</h1>
            <br />
            <br />
            <h3 className='city'>{weather.name} , {weather.sys?.country}</h3>
            <br />
            <br />
            <div className='icon-items'>
                <div className='image'>
                    <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt={weather.weather?.[0].main} />
                    <br />
                    <h4 className='temp'>
                    {isCelcius ? n : fahrenheit} {" "}
                    {isCelcius ? "°C" : "°F"}
                    </h4>
                </div>
                <br />
                <br />
                <div>
                    <aside className='text'>
                    <ul>
                        <li className='weather'>
                            Weather
                            <br /> 
                            <span>{weather.weather?.[0].description}</span>
                        </li>
                        <br />
                        <br />
                        <li>Wind: <span>{weather.wind?.speed} mb</span></li>
                        <br />
                        <br />
                        <li>Clouds: <span>{weather.clouds?.all}%</span></li>
                        <br />
                        <br />
                        <li>Humidity: <span>{weather.main?.humidity}%</span></li>
                        <br />
                        <br />
                    </ul>
                    </aside>
                </div>
            </div>
            <button className='change' onClick={changeUnits}>Change C° / F°</button>
        </div>
    );
};

export default Weather;