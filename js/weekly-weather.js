import { getWeeklyWeather } from './services/weather.js'
import { getLatLon } from './geolocation.js'
import { formatWeekList } from './utils/format-data.js'
import { createDOM } from './utils/dom.js'
import {createPeriodTime} from './period-time.js'
import { createTabInfo } from './tabs-info.js'
import draggable from './draggable.js'

function tabPanelTemplate(id) {
  return `
  <div class="tabPanel" tabindex="0" aria-labelledby="tab-${id}">
          <div class="dayWeather" id="dayWeather-${id}">
            <ul class="dayWeather-list" id="dayWeather-list-${id}">

            </ul>
          </div>
        </div>
  `
}

function createTabPanel(id){
  const $panel = createDOM(tabPanelTemplate(id))
  if (id > 0){
    $panel.hidden = true
  }
  return $panel
}

function configWeeklyWeather(weekList) {
  const $container = document.querySelector('.tabs')
  weekList.forEach((day, index) => {
    const $panel = createTabPanel(index)
    $container.append($panel)
    day.forEach((weather,indexWeather)=>{
      $panel.querySelector('.dayWeather-list').append(createPeriodTime(indexWeather,weather))
      const $tabInfo = createTabInfo(indexWeather,weather);
      $panel.querySelector('.dayWeather').append($tabInfo);
    })
  }) 
   
  const $dayWeatherItem = document.querySelectorAll(".dayWeather-item");
  $dayWeatherItem.forEach((item, index) => {    
    item.addEventListener("click", handleSelectTabInfoClick);
  });
}

function handleSelectTabInfoClick(event) {  
  const $dayWeatherItemSelected = event.currentTarget;
  const $dayWeatherItemActive = document.querySelector('.dayWeather-item[aria-selected="true"]');
  $dayWeatherItemActive.removeAttribute("aria-selected");
  $dayWeatherItemSelected.setAttribute("aria-selected", true);

  const id = $dayWeatherItemSelected.id;
  
  const $weatherSummary = document.querySelector(`[aria-labelledby=${id}]`);
  const $weatherSummarySelected = document.querySelector(`.dayWeather-summary:not([hidden])`);

  $weatherSummary.hidden = false;
  $weatherSummarySelected.hidden = true;
}

export default async function weeklyWeather() {
  const $container = document.querySelector('.weeklyWeather')
  const { lat, lon, isError } = await getLatLon()
  if (isError) return console.log('Ha ocurrido un error ubicándote')
  const { isError: weeklyWeatherError, data: weather } = await getWeeklyWeather(lat, lon)
  if (weeklyWeatherError) return console.log('Oh!, ha ocurrido un error trayendo el pronóstico del clima.')
  const weekList = formatWeekList(weather.list)
  configWeeklyWeather(weekList)
  draggable($container)
}