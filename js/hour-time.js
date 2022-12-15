import { createDOM } from './utils/dom.js'
import { formatTemp, formatWindSpeed } from './utils/format-data.js'

function infoWeatherTemplate({ tempMax,tempMin,speed,humidity }) {
  return `
          <div class="tabWeather-tempMax">
            <span class="tabWeather-title">Máx:</span>
            <span class="tabWeather-info">${tempMax}</span>
          </div>
          <div class="tabWeather-tempMin">
            <span class="tabWeather-title">Mín:</span>
            <span class="tabWeather-info">${tempMin}</span>
          </div>
          <div class="tabWeather-wind">
            <span class="tabWeather-title">Viento:</span>
            <span class="tabWeather-info">${speed}</span>
          </div>
          <div class="tabWeather-humidity">
            <span class="tabWeather-title">Humedad:</span>
            <span class="tabWeather-info">${humidity}%</span>
          </div>
  `
}

export function createInfoWeather(weather,id) {

  const tempMax = formatTemp(weather.main.temp_max)
  const tempMin = formatTemp(weather.main.temp_min)
  const speed = formatWindSpeed(weather.wind.speed)
  const config = {
    tempMax,
    tempMin,
    speed,
    humidity: weather.main.humidity
  }

  const $info = createDOM(infoWeatherTemplate(config))
  if (id > 0) {
    $info.hidden = true
  }
  return $info
}