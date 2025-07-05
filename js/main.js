//............variables............

let searchInp = document.getElementById('search');
let findInp = document.getElementById('find');
let expectations = document.getElementById('expectations');

// variable to store the data that coming from API
let myApi;

// use new : do make new object can be changing on it
let date = new Date();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
// to retuen the number date from object date
let tomorrow = date.getDate() + 1;
let afterTomorrow = date.getDate() + 2;


// ................when start................


// to return the forecast For the virtual city (Cairo).
(function () {
    getAllDetails();
})();


// ............to check the name and the show it if it exists............

searchInp.addEventListener('input', getAllDetails);
findInp.addEventListener('click', getAllDetails);


// ....................for Details and show them....................

// async: When you want to execute code immediately when the file is run
// await: used in async To pause execution until the data fetch is finished without freezing
// We put inside it the code that might go wrong like fetching data from the internet // Objective: To prevent the site from crashing in case of a fetch failure or no internet connection.
// await 1 : to recieve data , await 2 : We wait until the response is fully received before moving to the next line.
async function getAllDetails() {
    try {
        let index = searchInp.value ? searchInp.value : "cairo";
        myApi = await (await fetch(`https://api.weatherapi.com/v1/forecast.json?key=3581baa687b340408b7104939220106&q=${index}07112&days=3`)).json();
        displayAllDetalis(myApi);
    }
    catch (error) {
        alert("Unable to fetch weather data. Please check your connection.");
    }
}


// ............cards of weather............

// details : paramater to recieve data that coming from API such as myapi
function displayAllDetalis(details) {
    let row =
        `
    <div class="col-lg-4">
        <div class="show bg-footer text-white-50 pb-4">
            <div class="date d-flex justify-content-between align-items-center px-3 py-2">
                <span>${days[date.getDay()]}</span> 
                <span>${date.getDate()} ${months[date.getMonth()]}</span> 
            </div>
            <div id="myCity" class="ps-3 mt-4 fs-5 fw-bold text-white text-capitalize">${details.location.name}</div>
            <div class="temperature d-flex justify-content-between align-items-center px-2 ms-2">
                <p class="fw-bold text-white">${details.current.temp_c}<sup>o</sup>C</p>
                <a href="https://www.weatherapi.com/"><img src="https:${details.current.condition.icon}" class="w-100" alt="current weather"></a>
            </div>
            <div class="custom ms-2 ps-2 mb-4 text-info fs-5">${details.current.condition.text}</div>
            <div class="details ms-3 px-2 pb-4">
                <span class=""><img src="img/icon-umberella.png" alt="umberella icon"> ${details.forecast.forecastday[0].day.daily_chance_of_rain} %</span>
                <span class="ms-3"><img src="img/icon-wind.png" alt="wind icon"> ${details.current.wind_kph} km/h</span>
                <span class="ms-3"><img src="img/icon-compass.png" alt="compass icon"> ${details.current.wind_dir}</span>
            </div>
        </div>
    </div>
    
    <div class="col-lg-4">
        <div class="bg-tomorrow text-white-50 text-center pb-4">
            <div class="date d-flex justify-content-center align-items-center py-2">
            <span>${tomorrow} ${months[date.getMonth()]}</span> 
            </div>
            <a href="https://www.weatherapi.com/"><img src="https:${details.forecast.forecastday[1].day.condition.icon}" alt="" class="my-4 pt-1"></a>
            <div class="temperature d-flex justify-content-center align-items-center flex-column my-4">
                <span class="fw-bold text-white fs-3 mb-1">${details.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</span>
                <small>${details.forecast.forecastday[1].day.mintemp_c}<sup>o</sup></small>
            </div>
            <div class="custom pb-1 my-5 text-info">${details.forecast.forecastday[1].day.condition.text}</div>
        </div>
    </div>

    <div class="col-lg-4">
        <div class="show-end bg-footer text-white-50 text-center pb-4">
            <div class="date d-flex justify-content-center align-items-center py-2">
            <span>${afterTomorrow} ${months[date.getMonth()]}</span> 
            </div>
            <a href="https://www.weatherapi.com/"><img src="https:${details.forecast.forecastday[2].day.condition.icon}" alt="" class="my-4 pt-1"></a>
            <div class="temperature d-flex justify-content-center align-items-center flex-column my-4">
                <span class="fw-bold text-white fs-3 mb-1">${details.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C</span>
                <small>${details.forecast.forecastday[2].day.mintemp_c}<sup>o</sup></small>
            </div>
            <div class="custom pb-1 my-5 text-info">${details.forecast.forecastday[2].day.condition.text}</div>
        </div>
    </div>
    `

    expectations.innerHTML = row;
}

// ........Subscribe........

let email;
let alertEmail = document.getElementById('alertEmail');

let SubscribeInp = document.getElementById('SubscribeInp');
let doneInp = document.getElementById('doneInp');


// validate the local storage
if (JSON.parse(localStorage.getItem('SubscribeList')) != null) {
    email = JSON.parse(localStorage.getItem('SubscribeList'));
}
else {
    email = [];
}

// vslidate the eamil
function validUserEmail() {
    let regexEmail = /^[a-zA-Z0-9_]{3,15}(@[a-zA-Z0-9]{3,15}\.com)$/;
    if (regexEmail.test(SubscribeInp.value)) {
        SubscribeInp.classList.add('is-valid');
        SubscribeInp.classList.remove('is-invalid');
        alertEmail.classList.add('d-none');
        return true;
    }
    else {
        SubscribeInp.classList.add('is-invalid');
        SubscribeInp.classList.remove('is-valid');
        alertEmail.classList.remove('d-none');
        return false;
    }
}

if (SubscribeInp) {
    SubscribeInp.addEventListener('input', function () {
        validUserEmail();
    })
}

if (doneInp) {
    doneInp.addEventListener('click', function () {
        if (validUserEmail()) {
            // add text on email
            email += SubscribeInp.value;
            localStorage.setItem('SubscribeList', JSON.stringify(email));
            resetInp();
        }
        else {
            alertEmail.innerHTML = 'this email is invalid';
            resetInp();
        }
    })
}

// clear after finish
function resetInp() {
    SubscribeInp.value = '';
}

