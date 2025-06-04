import "./App.css";
import React, { useState } from "react";

const API = "094f73629282ae3e8177343466091122";
function App() {
  const [Weather, setWeather] = useState("");
  const [error, seterror] = useState("");
  const [loading, setloading] = useState(false);
  const [city, setcity] = useState("");

  async function fetchweather() {
    if (!city) {
      return;
    }
    setWeather("");
    setloading(true);
    seterror("");

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}&units=metric`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      setWeather(json);
    } catch (error) {
      seterror(error.message);
    }
    setloading(false);
  }

  const getBackgroundClass = () => {
    if (!Weather) return "default";
    const main = Weather.weather[0].main.toLowerCase();
    if (main.includes("cloud")) return "cloudy";
    if (main.includes("rain")) return "rainy";
    if (main.includes("clear")) return "sunny";
    if (main.includes("snow")) return "snowy";
    return "default";
  };
  return (
    <div className={`App ${getBackgroundClass()}`}>
      <div className="weather-container container">
      <div className=" row g-3 d-flex flex-column align-items-center mb-3">
        <div className="col-auto">
          <label htmlFor="city " className="col-form-label">
           <b>Enter City</b> 
          </label>
        </div>
        <div className="col-auto">
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setcity(e.target.value)}
            className="form-control"
            placeholder="Enter City"
            onKeyDown={(e) => e.key === "Enter" && fetchweather()}

          />
        </div>
        <div className="col-auto">
          <button
            type="submit"
            onClick={fetchweather}
            className="btn btn-light mb-3"
          >
            Get Weather
          </button>
        </div>
      </div>
      {loading && (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {Weather && (
        <>
          <div
            className="container card text-center mb-3"
            style={{ width: "18rem" }}
          >
            <div className="card-body">
              <h3 className="card-title">
                {Weather.name}, {Weather.sys.country}
              </h3>
              <h4 className="card-title">{Math.round(Weather.main.temp)}°C</h4>
              <p>
                {Weather.weather[0].main} - {Weather.weather[0].description}
              </p>
              <p>
                {" "}
                Wind : {Weather.wind.speed} , Clouds : {Weather.clouds.all} %
              </p>
              <p> Visibility : {Weather.visibility} m </p>
              <h5 className="card-title">
                {" "}
                {Weather.rain?.["1h"] &&
                  `Rain: ${Weather.rain["1h"]} mm/h`}{" "}
                {Weather.snow?.["1h"] && `, Snow: ${Weather.snow["1h"]} mm/h`}
              </h5>
              <h5 className="card-title">
                Sunrise :{" "}
                {new Date(Weather.sys.sunrise * 1000).toLocaleTimeString()}{" "}
                Sunset :{" "}
                {new Date(Weather.sys.sunset * 1000).toLocaleTimeString()}
              </h5>
            </div>
          </div>
        </>
      )}
      </div>
    </div>
  );
}

export default App;
