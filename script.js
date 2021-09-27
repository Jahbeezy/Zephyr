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
    var URL = "https://api.openweathermap.org/data/2.5/weather?q=" + input.value + "&units=imperial&appid=996c94364b7477ad5464025a50334747"

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


                var imgEl = document.createElement("img")
                
                
                imgEl.setAttribute("src", "https://openweathermap.org/img/wn/" + dato.list[i].weather[0].icon + ".png")
                imgEl.setAttribute("width", "35px")
                imgEl.setAttribute("id", "imgEL" + i)
                dateH4.append(imgEl)
                var imgEl2 = document.createElement("img")

                
                
                imgEl2.setAttribute("src", "https://openweathermap.org/img/wn/" + dato.list[0].weather[0].icon + ".png")
                imgEl2.setAttribute("id", "imgEL2" + i)
                

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
            var cow = imgEl2
            dayEl.append(cow)
        })


    

    createList()
    showHist()

}

function createList() {

    var searchHist = {
        city: input.value
    }
    if (localStorage.getItem("city") === null) {
        var searchHistArray = [searchHist]
        localStorage.setItem("city", JSON.stringify(searchHistArray))
    } else {
        
        var localHist = localStorage.getItem("city")
        var localParse = JSON.parse(localHist)
        localParse.unshift(searchHist)
        localStorage.setItem("city", JSON.stringify(localParse))
    }

}

function showHist() {
    searchEl.innerHTML = ""
    fiveDayEl.innerHTML = ""


    var histDisp = JSON.parse(localStorage.getItem("city"));

    if (histDisp !== null) {

        for (var i = 0; i < histDisp.length && i < 8; i++) {
           
            var hiist = histDisp[i]
            var liHist = document.createElement('li')
            liHist.classList.add("searchHist")
            liHist.textContent = hiist.city
            searchEl.appendChild(liHist)
        }

    }

}


button.addEventListener("click", weather)