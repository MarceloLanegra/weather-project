import { getWeeklyWeather } from './services/weather.js'
import { getLatLon } from './geolocation.js'
import { formatWeekList } from './utils/format-data.js'
import { createDOM } from './utils/dom.js'
import { createInfoWeather } from './hour-time.js'
import draggable from './draggable.js'

function tabWeatherTemplate(id) {
  return `
  <div class="tabWeather">
    <h1>${id}</h1>
  </div>
  `
}

function createTabWeather(id) {
  const $info = createDOM(tabWeatherTemplate(id))
  if (id > 0) {
    $info.hidden = true
  }
  return $info
}

function configHourWeather(weekList) {

  const $container = document.querySelector('.tabs')

  weekList.forEach((day, index) => {
    const $info = createTabWeather(index)
    $container.append($info)
    // debugger
    // day.forEach((weather, indexWeather) => {
    //   $panel.querySelector('.dayWeather-list').append(createPeriodTime(weather))
    //   // debugger
    //   $info.append(createInfoWeather(weather))
    //   // $container.append(createInfoWeather(weather,indexWeather))
    // })
    // $container.append(createInfoWeather(day, index))
  }
  )
  // $container.append($info)
}

export default async function hourWeather() {
  const $container = document.querySelector('.weeklyWeather')
  const { lat, lon, isError } = await getLatLon()
  if (isError) return console.log('Ha ocurrido un error ubicándote')
  const { isError: weeklyWeatherError, data: weather } = await getWeeklyWeather(lat, lon)
  if (weeklyWeatherError) return console.log('Oh!, ha ocurrido un error trayendo el pronóstico del clima.')
  const weekList = formatWeekList(weather.list)
  configHourWeather(weekList)
  draggable($container)
}