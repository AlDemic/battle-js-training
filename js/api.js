//var initialization
export async function initWeatherInfo() {
    const weatherInfo = await getWeather();

    const isDay = weatherInfo.current.is_day; //0 -> night; 1 -> day

    //if any precipitation -> precip = 1;
    const precip = (weatherInfo.current.rain === 0 && weatherInfo.current.showers === 0 && weatherInfo.current.snowfall === 0) ? 0 : 1;

    return { isDay, precip };
}

//get weather info
async function getWeather() {
    try {
        //city weather
        const cityWeather = 'Moscow';
        
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,is_day,weather_code,rain,showers,snowfall&timezone=Europe%2F${cityWeather}&forecast_days=1`);
        if(!res.ok) throw new Error(`HTTP error! ${res.status}`);
        return await res.json();
    } catch(err) {
        console.error('API error', err);
        return null;
    }
}