function refreshWeather(response){
    let temperatureElement =document.querySelector("#temperature");
    let temperature=response.data.temperature.current;
     let cityElement=document.querySelector("#city");
    
     cityElement.innerHTML=response.data.city;
    temperatureElement.innerHTML= Math.round(temperature);
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