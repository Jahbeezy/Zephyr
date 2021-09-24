var dayEl = document.getElementById("date")
var input = document.getElementById('input')
var button = document.getElementById("btn")
var resultsEL = document.getElementById("results")
var searchEl = document.getElementById("searchHistory")

var tempEl = document.getElementById("temp")
var windEl = document.getElementById("wind")
var humidEl = document.getElementById("humid")
var uvEl = document.getElementById("uv")


var fiveDateEl = document.getElementById('fiveDate')
var fiveDayEl = document.getElementById('fiveDay')
var fiveTempEl = document.getElementById('fiveTemp')
var fiveWindEl = document.getElementById('fiveWind')
var fiveHumidEl = document.getElementById('fiveHumid')


var date = moment().format("L")

//996c94364b7477ad5464025a50334747 api key

dayEl.innerHTML = date

function weather(e) {



    e.preventDefault();
    var URL = "http://api.openweathermap.org/data/2.5/weather?q=" + input.value + "&units=imperial&appid=996c94364b7477ad5464025a50334747"

    resultsEL.classList.remove("hide")

    fetch(URL)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            console.log(data)
            var temp = data.main.temp
            var wind = data.wind.speed
            var humid = data.main.humidity

            dayEl.innerHTML = data.name + " " + date
            tempEl.innerHTML = "Temp: " + temp + " °F"
            windEl.innerHTML = "Wind: " + wind + " MPH"
            humidEl.innerHTML = "Humidity: " + humid + "%"

            var lon = data.coord.lon
            var lat = data.coord.lat
            var uvURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=996c94364b7477ad5464025a50334747"

            fetch(uvURL)
                .then(function (resi) {
                    return resi.json();
                })
                .then(function (dati) {
                    console.log(dati)
                    var uvi = dati.current.uvi
                    uvEl.innerHTML = "UV Index: " + uvi



                })

        })


    var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + input.value + "&units=imperial&appid=996c94364b7477ad5464025a50334747"
    fetch(fiveDayURL)
        .then(function (reso) {
            return reso.json();
        })
        .then(function (dato) {
            e.preventDefault();
            console.log(dato)
            for (var i = 0, b = 0; i < 39, b < 5; i += 8, b++) {

                var fiveDiv = document.createElement('div')
                fiveDiv.classList.add("fiveBox")
                fiveDiv.setAttribute("id", "fiveBox" + i)
                fiveDayEl.appendChild(fiveDiv)


                var dateH4 = document.createElement('h4')
                dateH4.classList.add("fiveDate")
                dateH4.setAttribute("id", "fiveDate" + i)
                dateH4.append(moment().add(b, "days").format("L"))
                fiveDiv.appendChild(dateH4)

                var ulEl = document.createElement('ul')
                ulEl.classList.add("list2")
                ulEl.setAttribute("id", "listX" + i)
                fiveDiv.appendChild(ulEl)


                var liTemp = document.createElement('li')
                liTemp.classList.add("fiveTemp")
                liTemp.setAttribute("id", "fiveTemp" + i)
                liTemp.append("Temp: " + dato.list[i].main.temp + " °F")
                ulEl.appendChild(liTemp)

                var liWind = document.createElement('li')
                liWind.classList.add("fiveWind")
                liWind.setAttribute("id", "fiveWind" + i)
                liWind.append("Wind: " + dato.list[i].wind.speed + " MPH")
                ulEl.appendChild(liWind)

                var liHumid = document.createElement('li')
                liHumid.classList.add("fiveHumid")
                liHumid.setAttribute("id", "fiveHumid" + i)
                liHumid.append("Humidity: " + dato.list[i].main.humidity + "%")
                ulEl.appendChild(liHumid)
                


            }
        })

}



button.addEventListener("click", weather)