import React, { useEffect, useState } from "react";
import clear_icon from "../assets/clear-icon.png";
import cloud_icon from "../assets/cloud-icon.png";
import drizzle_icon from "../assets/drizzel-icon.png";
import rain_icon from "../assets/rain-icon.png";
import snow_icon from "../assets/snow-icon.png";
import "./weather.css";

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [searchName, setSearchName] = useState("");

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": clear_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "11d": rain_icon,
    "11n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const weatherGetData = async (city) => {
    try {
      const API_KEY = "5cac52a62c405dfe8ae0c7c8637bd417";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.cod === 200) {
        const icon = allIcons[data.weather[0].icon] || clear_icon;
        setWeatherData({
          humidity: data.main.humidity,
          temperature: data.main.temp,
          feelLike: data.main.feels_like,
          description: data.weather[0].description,
          wind: data.wind.speed,
          name: data.name,
          date: data.dt,
          icon: icon,
        });
        setSearchName(""); 
      } else {
        alert("City not found");
      }
    } catch (error) {
      alert("Failed to fetch weather data", error);
    }
  };

  useEffect(() => {
    weatherGetData("Kasur");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchName) {
      weatherGetData(searchName);
    }
  };

  const handleChange = (e) => {
    setSearchName(e.target.value);
  };

  const { humidity, temperature, description, wind, name, date, icon, feelLike } =
    weatherData || {};

  return (
    <div className="weather-container">
      <form onSubmit={handleSubmit} className="form-container">
        <input
          placeholder="Enter city name!"
          type="text"
          value={searchName}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
      {weatherData ? (
        <div className="weather-card">
          <div className="left-section">
            <img src={icon} alt="Weather Icon" className="weather-icon" />
            <p className="weather-status">{description.toUpperCase()}</p>
          </div>
          <div className="right-section">
            <p className="temperature">{Math.round(temperature)}°</p>
            <p className="sub-description">Feel Like: {feelLike}</p>
            <p className="wind-speed">WIND: {wind} m/s</p>
            <p className="humidity">HUMIDITY: {humidity}%</p>
            <p className="location">Location: {name}</p>
            <p className="date">
              Date and Time: {new Date(date * 1000).toLocaleString()}
            </p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Weather;
