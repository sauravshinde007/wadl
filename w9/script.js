function fetchWeather(){
    const city = document.getElementById("cityInput").value.trim();

    //base condition
    if(city === ""){
        showError("Please Enter a city Name.");
        return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('GET','weather.json',true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                const weatherData = JSON.parse(xhr.responseText);
                if(weatherData[city]){
                    document.getElementById('cityName').innerText = city;
                    document.getElementById('temp').innerText = weatherData[city].temperature;
                    document.getElementById('humidity').innerText = weatherData[city].humidity;
                    document.getElementById('condition').innerText = weatherData[city].condition;
                    document.getElementById('weatherResult').style.display = 'block';
                    document.getElementById('errorMsg').style.display = 'none';
                }else{
                    showError("City not found in our database.");
                }
            }else{
                showError("Failed to load weather data.");
            }
        }
    };
    xhr.send();
}

function showError(message) {
    document.getElementById("weatherResult").style.display = 'none';
    const errorDiv = document.getElementById("errorMsg");
    errorDiv.style.display = 'block';
    errorDiv.innerText = message;
}