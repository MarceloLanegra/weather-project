import { createDOM } from './utils/dom.js'
import {formatDate, formatTemp} from './utils/format-data.js'

function periodTimeTemplate(index,{temp,date,icon,description}){
  let value = false
  if (index === 0){
    value = true
  }
  return ` <li class="dayWeather-item" aria-selected="${value}" id="item-${index}">
      <span class="dayWeather-time">${date}</span>
      <img class="dayWeather-icon" height="48" width="48" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" rain="">
      <span class="dayWeather-temp">${temp}</span>
    </li>`;
}

export function createPeriodTime(index, weather){

  const dateOptions = {
    hour: 'numeric',
    hour12: true,
  }
  const temp = formatTemp(weather.main.temp)
  const date = formatDate(new Date(weather.dt * 1000), dateOptions)
  const config = {
    temp,
    date,
    icon: weather.weather[0].icon,
    description: weather.weather[0].description
  }

  return createDOM(periodTimeTemplate(index, config))
}