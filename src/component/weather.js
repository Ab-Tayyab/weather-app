import React, { useEffect, useState } from "react";
import clear_icon from "../assests/clear-icon.png";
import cloud_icon from "../assests/cloud-icon.png";
import drizzel_icon from "../assests/drizzel-icon.png";
import rain_icon from "../assests/rain-icon.png";
import snow_icon from "../assests/snow-icon.png";
import "./weather.css";

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [iconID,setIconID] = useState("")

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzel_icon,
    "04n": drizzel_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const getBackgroundGradient = (weatherCondition) => {
    switch (weatherCondition) {
      case "01d":
      case "01n":
        return "linear-gradient(to bottom, #87CEEB, #FFCC33)";
      case "02d":
      case "02n":
      case "03d":
      case "03n":
        return "linear-gradient(to bottom, #d3d3d3, #a9a9a9)";
      case "04d":
      case "04n":
      case "09d":
      case "09n":
      case "10d":
      case "10n":
        return "linear-gradient(to bottom, #4a536b, #2c3e50)";
      case "13d":
      case "13n":
        return "linear-gradient(to bottom, #e0f7fa, #b2ebf2)";
      default:
        return "linear-gradient(to bottom, #ff7e5f, #feb47b)"; // Default sunset gradient
    }
  };
  const weatherGetData = async (city) => {
    try {
      const API_KEY = "5cac52a62c405dfe8ae0c7c8637bd417";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      const response = await fetch(url);
      const data = await response.json();
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setIconID(data.weather[0].icon);
      setWeatherData({
        humidity: data.main.humidity,
        temperature: data.main.temp,
        description: data.weather[0].description,
        wind: data.wind.speed,
        name: data.name,
        date: data.dt,
        icon: icon,
      });
      console.log(data);
    } catch (error) {
      console.error("Failed to fetch weather data", error);
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

  const { humidity, temperature, description, wind, name, date, icon } =
    weatherData || {};

    const weatherCondition = iconID;
const backgroundStyle = { background: getBackgroundGradient(weatherCondition) };
  return (
    <div className="weather-container" style={backgroundStyle}>
      <h1>Weather Forecast</h1>
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
          <div>
            <p>Location: {name}</p>
            <p>Date and Time: {new Date(date * 1000).toLocaleString()}</p>
            <p>Temperature: {temperature}°C</p>
            <img src={icon} alt={clear_icon} />
          </div>
          <div>
            <p>Location: {name}</p>
            <p>Date and Time: {new Date(date * 1000).toLocaleString()}</p>
            <p>Humidity: {humidity}%</p>
            <img src={icon} alt={clear_icon} />
          </div>
          <div>
            <p>Location: {name}</p>
            <p>Date and Time: {new Date(date * 1000).toLocaleString()}</p>
            <p>Weather: {description}</p>
            <img src={icon} alt={clear_icon} />
          </div>
          <div>
            <p>Location: {name}</p>
            <p>Date and Time: {new Date(date * 1000).toLocaleString()}</p>
            <p>Wind Speed: {wind} m/s</p>
            <img src={icon} alt={clear_icon} />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Weather;
