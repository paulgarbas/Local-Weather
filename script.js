"use strict";

let lat;
let lon;
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        let lat = position.coords.latitude; 
        let lon = position.coords.longitude;
        $(document).ready(function() {
            $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&APPID=218a9e8859f9e8bd9f0dfd1175b38c11", function(json) {
                let html = "";
                let icon = json.weather[0].icon;
                let isClicked = false;
                let toFahrenheit;
                let toCelsius;
                let toMiles;
                let numberToString = json.weather[0].id.toString();
                let description = "";
                let weatherDescription;
                let weatherIcon = "";
                let iconArray = [];
                let uniqueArray;
                
                //from Kelvin to Celsius on document load
                function getCelsiusFromKelvin() {
                    return json.main.temp - 273.15;
                }
                
                //render all weather description
                json.weather.forEach(function(item) {
                    description += item.description + ", ";
                    weatherDescription = description.slice(0, description.length - 2);
                });

                //render weather icons
                    //push icons to array
                    json.weather.forEach(function(item) {
                        iconArray.push(item.icon); 
                    });
                    //remove all duplicated icons
                    uniqueArray = iconArray.filter(function(item, pos) {
                        return iconArray.indexOf(item) == pos;
                    })
                    //render each icon
                    uniqueArray.forEach(function(item) {
                        weatherIcon += `<img src="http://openweathermap.org/img/w/${item}.png" alt="Weather Icon">`;
                    });
                
                //render information
                html = `
                    <div class="app-box">
                        <h1 class="app-name">Local Weather</h1>
                        <div class="information">
                            <div class="information temperature">
                                <h1 class="temperature-toggle">${getCelsiusFromKelvin()}</h1> 
                                <h1 class="symbol">&#8451;</h1>
                            </div>
                            <button>Fahrenheit</button>
                        </div>
                        <div class="weather-icon">
                            ${weatherIcon}
                        </div>
                        <div class="condition">
                            Condition: ${weatherDescription}
                        </div>
                        <div class="wind-speed">
                            Wind Speed: ${json.wind.speed} m/s
                        </div>
                        <div>
                            ${json.name}, 
                            ${json.sys.country}
                        </div>
                    </div>
                `;
                $("#location").html(html);

                //toggle button from Cesius to Fahrenheit and wind speed meters to miles
                $("button").on("click", function() {
                    $(".temperature-toggle").html(function() {
                        if (isClicked === false) {
                            isClicked = true;
                            return toFahrenheit = (1.8 * (json.main.temp - 273.15) + 32).toFixed(2);
                        } else if (isClicked === true) {
                            isClicked = false;
                            return toCelsius = (5 / 9 * (toFahrenheit - 32)).toFixed(0);
                        }
                    });

                    //change wind speed meters to miles
                    $(".wind-speed").html(function() {
                        if (isClicked === true) {
                            toMiles = (json.wind.speed * 2.2369).toFixed(2);
                            return `<div>Wind Speed: ${toMiles} mph</div>`;
                        } else if (isClicked === false) {
                            return `<div>Wind Speed: ${json.wind.speed} m/s</div>`;
                        }
                    });
                    
                    //scale symbol change on button toggle
                    $(".symbol").html(function() {
                        if (isClicked === false) {
                            return "&#8451;"
                        } else if (isClicked === true) {
                            return "&#8457;";
                        }
                    });

                    //button text change on button toggle
                    $("button").text(function() {
                        if (isClicked === false) {
                            return "Fahrenheit"
                        } else if (isClicked === true) {
                            return "Celsius";
                        }
                    });
                }); 

                //background image depending on weather id 
                if ("200, 201, 202, 210, 211, 212, 221, 230, 231, 232".includes(numberToString)) {
                    return $("body").css({"background-image": "url('img/thunder.jpeg')"});
                } else if ("300, 301, 302, 310, 311, 312, 313, 314, 321".includes(numberToString)) {
                    return $("body").css({"background-image": "url('img/drizzle.jpeg')"});
                }  else if ("500, 501, 502, 503, 504, 511, 520, 521, 522, 531".includes(numberToString)) {
                    return $("body").css({"background-image": "url('img/rain.jpeg')"});
                } else if ("600, 601, 602, 611, 612, 615, 616, 620, 621, 622".includes(numberToString)) {
                    return $("body").css({"background-image": "url('img/snow.jpeg')"});
                } else if ("701, 711, 721, 731, 741, 751, 761, 762, 771".includes(numberToString)) {
                    return $("body").css({"background-image": "url('img/fog.jpeg')"});
                } else if ("800, 951".includes(numberToString)) {
                    return $("body").css({"background-image": "url('img/clear-sky.jpeg')"});
                } else if ("801, 802, 803, 804".includes(numberToString)) {
                    return $("body").css({"background-image": "url('img/clouds.jpeg')"});
                } else if ("781, 900, 901, 902, 957, 958, 959, 960, 961, 962".includes(numberToString)) {
                    return $("body").css({"background-image": "url('img/storm.jpeg')"});
                } else if ("903".includes(numberToString)) {
                    return $("body").css({"background-image": "url('img/cold.jpeg')"});
                } else if ("904".includes(numberToString)) {
                    return $("body").css({"background-image": "url('img/hot.jpeg')"});
                } else if ("905, 952, 953, 954, 955, 956".includes(numberToString)) {
                    return $("body").css({"background-image": "url('img/wind.jpeg')"});
                } else if ("906".includes(numberToString)) {
                    return $("body").css({"background-image": "url('img/hail.jpg')"});
                } else {
                    return $("body").css({"background-image": "url('img/else.jpeg')"});
                }
            });     
        });
    });
}


                
                
                





