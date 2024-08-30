
const inputbox = document.querySelector('.input_box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather_img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind_speed');
const location_not_found = document.querySelector('.location_not_found');
const weather_body = document.querySelector('.weather_body');
                                           
async function checkWeather(city) {
    const api_key = "9e634e47e30bdd81ff25a03d89cdf951";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(url).then(response => response.json());

    if (weather_data.cod === "404") {
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }

    location_not_found.style.display = "none";
    weather_body.style.display = "flex";
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

    switch (weather_data.weather[0].main.toLowerCase()) {
        case 'clouds':
            weather_img.src = "/Weather_image/cloud_image.jpg";
            break;
        case 'clear':
            weather_img.src = "/Weather_image/clear_image.jpg";
            break;
        case 'rain':
            weather_img.src = "/Weather_image/rain_image.jpg";
            break;
        default:
            weather_img.src = "/Weather_image/default_image.jpg";
            break;
    }
}
searchBtn.addEventListener('click', () => {
    checkWeather(inputbox.value);
});
