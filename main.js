const api = {
  key: "3dea9be2901a0ea2db3e89d90684aeb4",
  base: "https://api.openweathermap.org/data/2.5/",
};

/* base urli sain siit: https://openweathermap.org/current */

const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

/* Keypress - siis kui vajutan ükskõik mis nuppu search boxis*/

function setQuery(evt) {
  console.log(evt);
  if (evt.key == "Enter") {
    getResults(searchbox.value);
    console.log(searchbox.value);
  }
}

/* 

* 13 tähendab Enter nupp 
* query - see info, mis on searchboxi sisestatud
* fetch - funktsioon, millega teha api päringut
* async - see funktsioon võib tulla viitega, mitte kohe. Await - oota, kuni tulemus on teada.
* kui kasutan API-sid, siis süntaksid on natuke teistmoodi. Nt await, async jne, et funktsioonde tulemus ei juhtu koheselt, st andmete teada saamiseks/vastuse saamiseks läheb rohkem aega.
* süntaks - viis, kuidas kood on kirjutatud.

*/

async function getResults(query) {
  const url = `${api.base}weather?q=${query}&units=metric&APPID=${api.key}`;
  console.log(url);

  // Teen p2ringu
  const results = await fetch(url);

  // Valin json osa p2ringust. Kui tahan andmeid saada JS json objektina, siis kasutan seda süntaksit:
  const jsonResults = await results.json();

  // Kutsun JSON objektiga displayResults funktsiooni
  displayResults(jsonResults);
}

//asukoha kuvamine

function displayResults(weather) {
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  // kuupäeva kuvamine

  let now = new Date();

  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  // temp kuvamine

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)} <span> °C </span>`;

  let weather_el = document.querySelector(".current .weather");
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector(".hi-low");
  hilow.innerText = `${Math.round(weather.main.temp_min)} °C / ${Math.round(
    weather.main.temp_max
  )} °C`;
}

function dateBuilder(d) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];

  //getDay kuvab mulle mitmes päev täna nädalas on. Loendamine: 0-6. Sunday - Saturday : 0 - 6

  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

getResults("Tallinn");
