const API_KEY = "8397d1d23350f98e7ec592185b2ec040";

const makeIconURL = (iconId) =>
  `https://openweathermap.org/img/wn/${iconId}@2x.png`;

  const getFormattedWeatherData = async (city, units = "metric") => {
    const geocodingAPI = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;
    const geocodingData = await fetch(geocodingAPI).then((res) => res.json()).then((data) => data[0]);
    const { lat, lon } = geocodingData;
    
    const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=${units}&appid=${API_KEY}`;
  
    const data = await fetch(URL)
      .then((res) => res.json())
      .then((data) => data);
  
    const {
      weather,
      main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
      wind: { speed },
      sys: { country },
      name,
    } = data.current;
  
    const { description, icon } = weather[0];
  
    return {
      description,
      iconURL: makeIconURL(icon),
      temp,
      feels_like,
      temp_min,
      temp_max,
      pressure,
      humidity,
      speed,
      country,
      name,
    };
  };
  