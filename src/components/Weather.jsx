import React, { useState, useEffect } from "react";

function Weather({ userLocation, weatherApiKey }) {
  const [weatherCallStatus, setWeatherCallStatus] = useState({
    loading: false,
    error: null,
  });

  const [weatherData, setWeatherData] = useState([]);

  const createUrl = (
    locationDataObj,
    apiKey,
    units = "metric",
    hrRange = 24
  ) => {
    const forcastCount = hrRange / 3;
    return `https://api.openweathermap.org/data/2.5/forecast?lat=${locationDataObj.latitude}&lon=${locationDataObj.longitude}&units=${units}&cnt=${forcastCount}&appid=${apiKey}`;
  };

  const API_ENDPOINT = createUrl(userLocation, weatherApiKey);
  //   console.log(
  //     "🚀 ~ file: Weather.jsx ~ line 16 ~ fetchData ~ API_ENDPOINT",
  //     API_ENDPOINT
  //   );

  useEffect(() => {
    const fetchData = async () => {
      setWeatherCallStatus({ ...weatherCallStatus, loading: true });

      try {
        const response = await fetch(API_ENDPOINT);

        if (!response.ok) {
          throw response;
        }

        const data = await response.json();

        console.log(data);
        formatWeatherData(data);
      } catch (err) {
        console.log("error in fetchData: ", err);
        setWeatherCallStatus({ ...weatherCallStatus, error: err });
        // console.log(weatherCallStatus.error);
      }
      setWeatherCallStatus({ ...weatherCallStatus, loading: false });
    };

    fetchData();
  }, [API_ENDPOINT]);

  const formatWeatherData = (weatherDataResponse) => {
    const weatherArr = weatherDataResponse["list"];
    const weatherForcast = [];
    for (const rangeData of weatherArr) {
      const date = new Date(rangeData.dt_txt);
      //   console.log(
      //     "🚀 ~ file: Weather.jsx ~ line 63 ~ formatWeatherData ~ date",
      //     date
      //   );
      const weatherInfo = rangeData.weather[0];
      const iconCode = weatherInfo.icon;
      const threeHrObj = {
        date: date,
        timeHours: date.getHours(),
        temp: rangeData.main.temp,
        weatherDesc: weatherInfo.description,
        iconCode: weatherInfo.icon,
        iconURL: `http://openweathermap.org/img/wn/${iconCode}@2x.png`,
      };
      weatherForcast.push(threeHrObj);
    }
    setWeatherData(weatherForcast);
  };

  if (weatherData.length === 0) {
    return (
      <div id="weather-area">
        <h2>Weather Forcast</h2>
        <p>Loading weather data...</p>
      </div>
    );
  }

  return (
    <div id="weather-area">
      <h2>
        Weather Forcast for{" "}
        {userLocation.city ? userLocation.city : "(loading location data...)"}
      </h2>
      <ul id="weather-list">
        {weatherData.map((rangeData, i) => (
          <li className="weather-item" key={i}>
            <h3>
              {rangeData.timeHours < 10
                ? `0${rangeData.timeHours}`
                : rangeData.timeHours}
              :00
            </h3>
            <img src={rangeData.iconURL} alt={rangeData.weatherDesc} />
            <p>{rangeData.temp}&#8451;</p>
            <p>{rangeData.weatherDesc}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Weather;
