// // START WEATHER

// function getWeatherInfo() {
//   const lat = 48.8892688
//   const lon = 2.2011316

//   const key = "bf63324dffc9c04fd1dd5f575ac75753";
//   const lang = "en";
//   const units = "metric";
//   const url = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=${units}&lang=${lang}`;

//   fetch(url)
//   .then(data => console.log(data))
//   console.log()
// }

// const Weather = {
//   init: () => {
//     document
// //      .getElementById("btnGet")
//       .addEventListener("click", Weather.fetchWeather);
// //    document
// //      .getElementById("btnCurrent")
// //      .addEventListener("click", Weather.getLocation);
//   },
//   fetchWeather: () => {
//     //use the values from latitude and longitude to fetch the weather
//     let lat = getLatitude
//     let lon = getLongitude

//     let key = "bf63324dffc9c04fd1dd5f575ac75753";
//     let lang = "en";
//     let units = "metric";
//     let url = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=${units}&lang=${lang}`;
//     //fetch the weather
//     //    Weather.showWeather()
// /*    fetch(url)
//       .then((resp) => {
//         if (!resp.ok) throw new Error(resp.statusText);
//         return resp.json();
//       })
//       .then((data) => {
//         Weather.showWeather(data);
//       })
//       .catch(console.err);*/
//   },
// /*  getLocation: (ev) => {
//     let opts = {
//       enableHighAccuracy: true,
//       timeout: 1000 * 10, //10 seconds
//       maximumAge: 1000 * 60 * 5, //5 minutes
//     };
//     navigator.geolocation.getCurrentPosition(Weather.ftw, Weather.wtf, opts);
//   },
//   ftw: (position) => {
//     //got position
//     document.getElementById("latitude").value =
//       position.coords.latitude.toFixed(2);
//     document.getElementById("longitude").value =
//       position.coords.longitude.toFixed(2);
//   },
//   wtf: (err) => {
//     //geolocation failed
//     console.error(err);
//   },*/
//   showWeather: (resp) => {
// //    console.log(resp);
//     let row = document.querySelector(".weather.row");
//     //clear out the old weather and add the new
//     // row.innerHTML = '';
//     row.innerHTML = resp.daily
//       .map((day, idx) => {
//         if (idx <= 2) {
//           let dt = new Date(day.dt * 1000); //timestamp * 1000
//           let sr = new Date(day.sunrise * 1000).toTimeString();
//           let ss = new Date(day.sunset * 1000).toTimeString();
//           return `<div class="col">
//               <div class="card">
//               <h5 class="card-title p-2">${dt.toDateString()}</h5>
//                 <img
//                   src="http://openweathermap.org/img/wn/${
//                     day.weather[0].icon
//                   }@4x.png"
//                   class="card-img-top"
//                   alt="${day.weather[0].description}"
//                 />
//                 <div class="card-body">
//                   <h3 class="card-title">${day.weather[0].main}</h3>
//                   <p class="card-text">High ${day.temp.max}&deg;C Low ${
//             day.temp.min
//           }&deg;C</p>
//                   <p class="card-text">High Feels like ${
//                     day.feels_like.day
//                   }&deg;C</p>
//                   <p class="card-text">Pressure ${day.pressure}mb</p>
//                   <p class="card-text">Humidity ${day.humidity}%</p>
//                   <p class="card-text">UV Index ${day.uvi}</p>
//                   <p class="card-text">Precipitation ${day.pop * 100}%</p>
//                   <p class="card-text">Dewpoint ${day.dew_point}</p>
//                   <p class="card-text">Wind ${day.wind_speed}m/s, ${
//             day.wind_deg
//           }&deg;</p>
//                   <p class="card-text">Sunrise ${sr}</p>
//                   <p class="card-text">Sunset ${ss}</p>
//                 </div>
//               </div>
//             </div>
//           </div>`;
//         }
//       })
//       .join(" ");
//   },
// };

// FIN WEATHER

// START EXCHANGE

function getExchange() {
  //  const USdollarvalue = 1.00
    const Eurovalue = 0.883783
    const BritishPoundvalue = 0.75677
    const Yenvalue = 112.781787
    const Yuanvalue = 6.376316
  
    document.write(
      "Current values of currencies based on the US Dollar:<br><br>" +
      "<br>Euro: " + Eurovalue + "$" +
      "<br>British Pound: " + BritishPoundvalue + "$" +
      "<br>Japanese Yen: " + Yenvalue + "$" +
      "<br>Chinese Yuan: " + Yuanvalue + "$");
  }
  
  
  // FIN EXCHANGE
  
  function Dashboard() {
  
    var ReactWeather = require('react-open-weather').default;
  
    const [user, setUser] = useState(null);
  
    const logout = async () => {
      firebase.auth().signOut()
      window.location.href = "/login"
    };
  
    app.auth().onAuthStateChanged(auth_user => {
      setUser(auth_user);
    });
  
    if (user) {
  
      return (
        <>
          <Navbar bg="dark" variant="dark">
            <Container >
              <Navbar.Brand href="/" className="navbar">
                <img
                  className="nav"
                  src={logo}
                  width="30"
                  height="30"
                  alt="Logo for the navbar"
                />{' '}
                Dashboard
              </Navbar.Brand>
              <Nav>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link onClick={logout}>Logout</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
          <script src="node_modules/react-open-weather/lib/js/ReactWeather.js"></script>
          {/* <button onClick={getLocation}>Try Location</button> */}
          <p></p>
          <button onClick={getExchange}>Try Exchange</button>
          <ReactWeather
            forecast="today"
            apikey="fb39b91d223a8e15cf94d28b8362319a"
            type="city"
            city="Munich"
          />
          <ReactWeather
            forecast="today"
            apikey="fb39b91d223a8e15cf94d28b8362319a"
            type="geo"
            lat="48.1351"
            lon="11.5820"
          />
        </>
      )
  
    } else {
      return (
        <p>Pas connecté</p>
      )
    }
  }
  
  export default Dashboard;
  