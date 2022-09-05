import { useState, useEffect } from 'react'
import axios from 'axios'
import './style.css'

function App() {
  //geting date and hour... 
  let date = new Date();
  let output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();
  let hora = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

  ////////////////////////////////////////////////////////
  //STATES..
  const [data, setData] = useState({});
  const [temp, setTemp] = useState(true)
  const [units, setUnits] = useState("°F")


  ///////////////////temperature units convert
  const Convert = () => {
    if (units === "°F") {
      setTemp(((temp - 32) * 0.55).toFixed(2))
      setUnits("°C")//to celsius
    } else {
      setTemp(((temp * 1.8) + 32).toFixed(2))
      setUnits("°F")//to farenheits
    }
  }

  //useEffect petition
  useEffect(() => {
    const success = pos => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      const APIKey = '99c5b4521134966e5c2d3bf620bdd0ba'

      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`)//API call
        .then(res => {
          setData(res.data)//geting info from api...
          setTemp((1.8 * (((res.data.main?.temp) - 273) + 32)).toFixed(2))//seting temperature...
        })
    }
    navigator.geolocation.getCurrentPosition(success);//geolocation funtion
  }, [])


  console.log(data)

  //OUTPUT...
  return (
    <div className="app">
      <div className="card">
        <h1>Weather App</h1>
        <h2>{data.name} , {data.sys?.country}</h2>
        <p style={{ color: "#bfc0c0" }}>{output}</p>
        <p style={{ color: "#bfc0c0" }}>{hora}</p>
        <img src={`http://openweathermap.org/img/wn/${data.weather?.[0].icon}@2x.png`} />
        <p><b>Pressure:</b>{data.main?.pressure} hPa</p>
        <p className="humidity"><b>Humidity:</b> {data.main?.humidity} %</p>
        <p className="wind"><b>Wind speed: </b>{data.wind?.speed} m/s</p>
        <p ><b>Temp:</b>{temp} {units}</p>

        <button onClick={Convert} >degrees °F / °C</button>
      </div>
    </div>
  )
}

export default App
