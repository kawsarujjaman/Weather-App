const inputBox = document.querySelector('.input-box');
const searchBox = document.querySelector('.search-box');
const searchBtn = document.getElementById('searchBtn');
const weatherImage = document.querySelector('.weather-image');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const weatherContent = document.querySelector('.weather-content');
const locationTitle = document.querySelector('.location-title');

const locationNotFound = document.querySelector('.location-not-found');
const weatherBody = document.querySelector('.weather-body');


inputBox.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter'){
        e.preventDefault();
        searchBtn.click();
    }
});


async function checkweather(city){

    const api_key = "c38a1b50c374733716afddf3be93fb80";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());


    const location = inputBox.value.trim();    
    locationTitle.innerHTML = `You searched for: <span>${location}</span>`;
    locationTitle.innerHTML = `You searched for: <span>${location}</span>`;

    

    if(weather_data.cod === '404'){
        locationNotFound.style.display = "flex";
        weatherBody.style.display = "none";
        return;
    }
    locationNotFound.style.display = "none";
    weatherBody.style.display = "flex";
   
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)} °C`;
    description.innerHTML =  `${weather_data.weather[0].description}`;
    humidity.innerHTML =  `${weather_data.main.humidity}%`;
    windSpeed.innerHTML =  `${weather_data.wind.speed}Km/H`;

    switch(weather_data.weather[0].main){
        case "Clouds" :
            weatherImage.src = "assets/cloud.png";
            break;
            case 'Clear' :
            weatherImage.src = "assets/clear.png";
            break;

            case 'Rain' :
            weatherImage.src = "assets/rain.png";
            break;

            case 'Mist' :
            weatherImage.src = "assets/mist.png";
            break;

            case 'Snow' :
            weatherImage.src = "assets/snow.png";
            break;
            
    }
   
}


searchBtn.addEventListener('click', ()=> {
     const searchInput = inputBox.value.trim();
    if( !searchInput){
        locationTitle.innerHTML = `📝 Write your city name to see the weather.`;
        return
    }
    checkweather(inputBox.value);
   
});

