import "./App.css";
import TaskList from "./components/TaskList";
import Weather from "./components/Weather.jsx";
import Joke from "./components/Joke.jsx";
import News from "./components/News.jsx";

import React, { useState, useEffect } from "react";

function App() {
  const [userLocation, setUserLocation] = useState({
    latitude: "51.50793633645921",
    longitude: "-0.12802020070910147",
    city: "London",
    country: "GB",
  });

  const weatherApiKey = "c5109d713d696aa0e1a0487c0f213040";

  /// TODO get user longitude and latitude from navigator
  useEffect(() => {
    const extractUserLocation = (dataObj, lat, lon) => {
      setUserLocation({
        latitude: lat,
        longitude: lon,
        city: dataObj[0].name,
        country: dataObj[0].country.toLowerCase(),
      });
      console.log("userLocation", userLocation);
    };

    async function getUserLocation() {
      try {
        // Get from our machine's geolocation
        const options = {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: 0,
        };

        const position = await new Promise((resolve, reject) => {
          return navigator.geolocation.getCurrentPosition(
            resolve,
            reject,
            options
          );
        });

        let { latitude: lat, longitude: lon } = position.coords;

        console.log(position);

        const apiEndpoint =
          await `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${weatherApiKey}`;
        const response = await fetch(apiEndpoint);

        if (!response.ok) throw response;

        const data = await response.json();

        console.log("data from geolocation api call: ", data);
        extractUserLocation(data, lat, lon);
      } catch (err) {
        console.log("error in getUserLocation in App.js", err);
      }
    }
    getUserLocation();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Morning Dashboard</h1>
      </header>
      <main>
        <div class="desktop-row">
          <TaskList />
          <News userLocation={userLocation} />
          <Joke />
        </div>
        <Weather userLocation={userLocation} weatherApiKey={weatherApiKey} />
      </main>
    </div>
  );
}

export default App;
