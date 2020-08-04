const locationsUrl = 'https://judgetests.firebaseio.com/locations.json';

const locationInput = document.getElementById('location');
const getWeatherBtn = document.getElementById('submit');
const forecastDiv = document.getElementById('forecast');
const currentDiv = document.getElementById('current');
const upcomingDiv = document.getElementById('upcoming');

function attachEvents() {
    getWeatherBtn.addEventListener('click', getWeather);

    const weatherMap = {
        'Sunny': '☀',
        'Partly sunny': '⛅',
        'Overcast': '☁',
        'Rain': '☂',
        'Degrees': '°'
    };

    function getWeather() {
        forecastDiv.style.display = 'block';

        fetch(locationsUrl)
            .then(response => response.json())
            .then(data => {
                let locationCode = '';

                [...data].forEach(location => {
                    if (location.name === locationInput.value) {
                        locationCode = location.code;
                    }
                });

                if (locationCode === '') {
                    throw new Error('Location not found');
                }

                return locationCode;
            })
            .then(locationCode => getCurrentForecast(locationCode))
            .then(locationCode => getUpcomingForecast(locationCode))
            .catch(error => forecastDiv.innerHTML = error);
    }

    function getCurrentForecast(locationCode) {
        const currentForecastUrl = `https://judgetests.firebaseio.com/forecast/today/${locationCode}.json`;

        fetch(currentForecastUrl)
            .then(response => response.json())
            .then(data => {
                const weatherDiv = document.createElement('weatherDiv');
                weatherDiv.classList.add('forecasts');

                const conditionSymbolSpan = document.createElement('span');
                conditionSymbolSpan.className = 'condition symbol';
                conditionSymbolSpan.innerHTML = weatherMap[data.forecast.condition];

                const conditionSpan = document.createElement('span');
                conditionSpan.classList.add('condition');

                const locationNameSpan = document.createElement('span');
                locationNameSpan.classList.add('forecast-data');
                locationNameSpan.innerHTML = data.name;

                const highLowSpan = document.createElement('span');
                highLowSpan.classList.add('forecast-data');
                highLowSpan.innerHTML = `${data.forecast.low}${weatherMap['Degrees']}/${data.forecast.high}${weatherMap['Degrees']}`;

                const conditionNameSpan = document.createElement('span');
                conditionNameSpan.classList.add('forecast-data');
                conditionNameSpan.innerHTML = data.forecast.condition;

                conditionSpan.appendChild(locationNameSpan);
                conditionSpan.appendChild(highLowSpan);
                conditionSpan.appendChild(conditionNameSpan);

                weatherDiv.appendChild(conditionSymbolSpan);
                weatherDiv.appendChild(conditionSpan);

                currentDiv.append(weatherDiv);
            });

        return locationCode;
    }

    function getUpcomingForecast(locationCode) {
        const upcomingForecastUrl = `https://judgetests.firebaseio.com/forecast/upcoming/${locationCode}.json`;

        fetch(upcomingForecastUrl)
            .then(response => response.json())
            .then(data => {
                const weatherDiv = document.createElement('weatherDiv');
                weatherDiv.classList.add('forecast-info');

                const forecasts = data.forecast;

                [...forecasts].forEach(forecast => {
                    const upcomingSpan = document.createElement('span');
                    upcomingSpan.classList.add('upcoming');

                    const symbolSpan = document.createElement('span');
                    symbolSpan.classList.add('symbol');
                    symbolSpan.innerText = weatherMap[forecast.condition];

                    const highLowSpan = document.createElement('span');
                    highLowSpan.classList.add('forecast-data');
                    highLowSpan.innerHTML = `${forecast.low}${weatherMap['Degrees']}/${forecast.high}${weatherMap['Degrees']}`;

                    const conditionNameSpan = document.createElement('span');
                    conditionNameSpan.classList.add('forecast-data');
                    conditionNameSpan.innerHTML = forecast.condition;

                    upcomingSpan.appendChild(symbolSpan);
                    upcomingSpan.appendChild(highLowSpan);
                    upcomingSpan.appendChild(conditionNameSpan);

                    weatherDiv.appendChild(upcomingSpan);
                });

                upcomingDiv.append(weatherDiv);
            });

        return locationCode;
    }
}

attachEvents();