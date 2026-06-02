function refreshWeather(response){
    let temperatureElement =document.querySelector("#temperature");
    let temperature=response.data.temperature.current;
    let cityElement=document.querySelector("#city");
    let descriptionElement=document.querySelector("#description");
    let humidityElement=document.querySelector("#humidity");
    let windElement=document.querySelector("#wind-speed");
    let timeElement=document.querySelector("#time");
    let date= new Date(response.data.time);

    let iconElement=document.querySelector("#icon");

console.log(response.data)
     iconElement.innerHTML=`<img src="${response.data.condition.icon_url}" class="temp-icon"/>`;
     timeElement.innerHTML=formatDate(date);
     descriptionElement.innerHTML=response.data.condition.description;
     humidityElement.innerHTML=`${response.data.temperature.humidity}%`;
     windElement.innerHTML= `${response.data.wind.speed}km/h`;
     cityElement.innerHTML=response.data.city;
    temperatureElement.innerHTML= Math.round(temperature);

    getForecast(response.data.city);
}

function formatDate(date){
    let hours=date.getHours();
    let minutes= date.getMinutes();
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Sataurday"]
    
    let day= days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
    if (minutes<10){
        minutes=`0${minutes}`
    }
}   

function searchCity(city){
    let apiKey="281d3c04932a5df0f10bbof67859adta";
    let apiUrl=`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`
    axios.get(apiUrl).then(refreshWeather);
}

function searchSubmit(event){
    event.preventDefault();
let searchInput=document.querySelector("#search-input");

searchCity(searchInput.value);
}

function formatDay(timestamp){
    let date=new Date(timestamp *1000);
    let days=["Sun","Mon", "Tue","Wed","Thur","Fri","Sat"];

    return days[date.getDay()];
}

function getForecast(city){
    let apiKey="281d3c04932a5df0f10bbof67859adta";
    let apiUrl=`https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
    axios.get(apiUrl).then(displayForecast);
    
}

function displayForecast(response){

    let forecastHtml="";

    response.data.daily.forEach(function(day, index) {
        if (index<5){
        forecastHtml=forecastHtml +
        `<div class="weather-forcast-details">
            <div class="weather-forcast-day"> ${formatDay(day.time)}</div> 
        
            <img src="${day.condition.icon_url}" class="weather-forecast-icon"/> 
            <div class="weather-forecast-temp">
            <div class="weather-forecast-temperature"><strong>${Math.round(day.temperature.maximum)}°</strong></div>
            <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}°</div>
            </div>
         </div>`;
        }
    });

    let forecastElement=document.querySelector("#forecast");
    forecastElement.innerHTML=forecastHtml;
}

let searchFormElement= document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchSubmit);

searchCity("Nairobi");

