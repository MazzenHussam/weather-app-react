import React, {useState} from 'react'

import './App.css'

const api ={
  key: "a1146f5850a6a2ed1431063a945d65d6",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

const [query, setQuery]= useState("")
const [weather, setWeather]= useState({})

const search =evt =>{
  if (evt.key === "Enter") {
    fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
    .then(res => res.json())
    .then(result =>{ 
      setWeather(result);
      setQuery("");
      console.log(result);
    })}
}


  const dateBuilder= (d) =>{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const day = days[d.getDay()];
  const dayOfMonth = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  return `${day} ${dayOfMonth} ${month} ${year}`;
  }


  return (

    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? "app warm" : "app") : "app"}>
    <main>
      <div className="search-box">
        <input
        type="text"
        className="search-bar"
        placeholder="Search for a city..."
        onChange={e => setQuery(e.target.value)}
        value={query}
        onKeyUp={search}
        />
      </div>
      {(typeof weather.main != "undefined") ? (
        <div>
      <div className="location-box">
        <div className="location">{weather.name}, {weather.sys.country}</div>
        <div className="date">{dateBuilder(new Date())}</div>
      </div>
      <div className="weather-box">
        <div className="temp">{Math.round(weather.main.temp)}°C</div>
        <div className="weather">{weather.weather[0].main}</div>
      </div>
      </div>
      ) : ('')}
    </main>
    </div>
  )
}

export default App
