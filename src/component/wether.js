import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = () => {
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cityName, setCityName] = useState(""); // State for city name

  const fetchWeatherData = async (city) => {
    const API_KEY = "5cac52a62c405dfe8ae0c7c8637bd417";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
      setLoading(true);  // Start loading
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setForecastData(data);
        setError(null);
      } else {
        setError(data.message);
        setForecastData(null);
      }
    } catch (err) {
      setError(err.message);
      setForecastData(null);
    } finally {
      setLoading(false);  // Stop loading
    }
  };

  // Handler for search button click
  const handleSearch = (e) => {
    e.preventDefault();
    if (cityName.trim()) {
      fetchWeatherData(cityName.trim());
    } else {
      setError("Please enter a city name.");
    }
  };

  // Handler for input change
  const handleChange = (e) => {
    setCityName(e.target.value);
  };

  return (
    <div>
      <h1>Weather Forecast</h1>
      <form onSubmit={handleSearch}>
        <input 
          placeholder="Enter city name" 
          value={cityName} 
          onChange={handleChange} 
        />
        <button type="submit">Search</button>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}

      {forecastData && (
        <div style={{ marginTop: "20px" }}>
          <div style={{ marginBottom: "10px" }}>
            <p>Date and Time: {new Date(forecastData.dt * 1000).toLocaleString()}</p>
            <p>Temperature: {forecastData.main.temp}°C</p>
            <p>Weather: {forecastData.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
