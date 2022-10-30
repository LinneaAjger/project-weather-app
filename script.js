const header = document.getElementById('header')
const weatherDescription = document.getElementById('weatherDescription')
const fiveDaysForecast = document.getElementById('fiveDaysForecast')
const weatherImg = document.getElementById('weatherImg')
const container = document.getElementById('container')
const weekdays = ["sun","mon","tue","wed","thu","fri","sat"];
const searchBar = document.getElementById('searchBar')
const citySearch = document.getElementById('searchInput')

let containerClass = document.querySelector('.container')
let selectedCity= 'stockholm'


const clearPage = () => {
    citySearch.value = ''
    console.log(selectedCity)
    }

const getTodaysWeather = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&units=metric&APPID=fb125bc213d8ee5c4a432b3a2b24aecf`)
        .then((response) => {
            return response.json()
        })

        .then((json) => {
            console.log(selectedCity)

            const sunRise = new Date (json.sys.sunrise * 1000);
            //making the time variables into strings to display the correct time format
            let sunRiseHoursAndMinutes = String(sunRise.getHours()).padStart(2, '0') + ':' + String(sunRise.getMinutes()).padStart(2, '0');
            console.log(sunRise.getHours(), sunRise.getMinutes()); 

            const sunSet = new Date (json.sys.sunset * 1000);
            let sunSetHoursAndMinutes = String(sunSet.getHours()).padStart(2, '0') + ':' + String(sunSet.getMinutes()).padStart(2, '0');
            console.log(sunSetHoursAndMinutes);

            const weathers = json.weather
            weathers.map((weather) => {

            header.innerHTML = `
            <h3>${weather.description} | ${(json.main.temp).toFixed(0)}°</h3>
            <h3>sunrise ${sunRiseHoursAndMinutes}</h3>
            <h3>sunset ${sunSetHoursAndMinutes}</h3>
            `
            
            // remove class named container-* from classList
            containerClass.classList.remove('container-cloudy');
            containerClass.classList.remove('container-clear');
            containerClass.classList.remove('container-rainy');

            //different actions depending on weather
            switch(weather.main) {
                case 'Clouds':  // if (x === 'value1')
                    console.log('cloudy');
                    weatherImg.innerHTML = `
                    <img src="./Designs/Design-2/icons/noun_Cloud_1188486.svg" alt="">`
                    weatherDescription.innerHTML = `
                    <h1>Light a fire and get cosy. ${json.name} is looking grey today. </h1>
                    `;
                    containerClass.classList.add('container-cloudy');
                    console.log(containerClass)
                break;
            
                case 'Rain':  // if (x === 'value2')
                    console.log('rainy')
                    console.log(weather.description)
                    weatherImg.innerHTML = `
                    <img src="./Designs/Design-2/icons/noun_Umbrella_2030530.svg" alt="">`       
                    weatherDescription.innerHTML = `
                    <h1>Don't forget your umbrella. It's wet in ${json.name} today.  </h1>
                    `
                    containerClass.classList.add('container-rainy');
                    console.log(containerClass)
                break;
            
                default:
                    console.log('sunny')
                    weatherImg.innerHTML = `
                    <img src="./Designs/Design-2/icons/noun_Sunglasses_2055147.svg" alt="">`
                    weatherDescription.innerHTML = `
                    <h1>Get your sunnies on. ${json.name} is looking rather great today. </h1>
                    </div>
                    `
                    containerClass.classList.add('container-clear');
                    console.log(containerClass)
                break;
            }

        })
    })


    //WEATHER-FORECAST FEATURE 
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&units=metric&APPID=fb125bc213d8ee5c4a432b3a2b24aecf`)
        .then((response) => {
            return response.json()
        })

        .then((json) => {
            console.log(json)
            
            //Filters the json to an array with only the data from 12:00 each day (5 days in total).
            const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
            console.log(filteredForecast)

            fiveDaysForecast.innerHTML = ''

            //weather description of each day
        filteredForecast.map((day)=>{
                console.log(day.weather[0].description)

                    let weekday = new Date(day.dt_txt).getDay();
                    console.log(weekdays[weekday]);


                    fiveDaysForecast.innerHTML += `
                    <div id="forecastSection" class="forecast-section">
                    
                        <div id="weekdaysection" class="weekday-section">
                            <h3> ${weekdays[weekday]} </h3>
                        </div>
                        
                        <div id="temperature" class="temperature">
                        <h3>${(day.main.temp).toFixed(0)}°</h3>
                        </div>

                    </div>
                    `   
                })
            })
}

getTodaysWeather()

searchBar.addEventListener('submit', (event) => {
    event.preventDefault();
    selectedCity = citySearch.value;
    getTodaysWeather()
    clearPage()
})