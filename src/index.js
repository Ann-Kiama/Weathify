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

let searchFormElement= document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchSubmit);

searchCity("Nairobi");