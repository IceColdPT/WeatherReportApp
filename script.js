var siwtchb = document.querySelector(".switchblade");
var cityName = document.querySelector(".title");
var temperature = document.querySelector(".temp");
var citySelector = document.querySelector(".selector");
var condition = document.querySelector("#condition");
var statusIcon = document.querySelector(".statusIcon");
var country = document.querySelector(".country")
var sunrise = document.querySelector(".sunrise")
var sunset = document.querySelector(".sunset");
var localtime = document.querySelector(".localtime");

var unit = "metric";

function getDate(stamp){
    return new Date(stamp * 1e3).toISOString().slice(-13, -5);
}



function getSelectedCityName(){
    return citySelector.options[citySelector.selectedIndex].value
}

function onChange(){
    getCityData(unit);
}

switchb.addEventListener("click",function(){
    if (unit == "metric"){
            unit = "imperial";
            switchb.innerHTML = "Imperial";
            getCityData(unit)
        }
        else{
            unit = "metric";
            switchb.innerHTML = "Metric";
            getCityData(unit)
        }
        
    })




function getCityData(units){
    fetch("http://api.openweathermap.org/data/2.5/weather?q="+getSelectedCityName()+"1&APPID=52a295b758be98b9b3760091a573d346"+"&units="+units)
    .then( response => response.json())
    .then(data=> {
        cityName.textContent = data['name'];
        if (units == "metric")
            temperature.textContent = data["main"]["temp"]+"ºC";
        else if(units == "imperial")
            temperature.textContent = data["main"]["temp"]+"ºF";
        else
            temperature.textContent = data["main"]["temp"]+"K";
        var conditionText = data["weather"][0]["main"];

        condition.textContent = conditionText;
        statusIcon.src = "http://openweathermap.org/img/wn/"+data["weather"][0]["icon"]+"@2x.png";

        country.textContent = data["sys"]["country"]
        sunset.textContent = getDate(data["sys"]["sunset"]);
        sunrise.textContent = getDate(data["sys"]["sunrise"]);
        localtime.textContent = getDate(data["timezone"] + data["dt"])

        


    })
    .catch(err => console.log("error"));
}

//main
getCityData(unit);