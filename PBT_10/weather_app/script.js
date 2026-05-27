const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const weatherResult = document.getElementById("weatherResult");

const cityName = document.getElementById("cityName");
const temp = document.getElementById("temp");
const humidity = document.getElementById("humidity");
const description = document.getElementById("description");
const weatherIcon = document.getElementById("weatherIcon");

const historyList = document.getElementById("historyList");


// ==========================
// Search button
// ==========================

searchBtn.addEventListener("click", () => {

    const city = cityInput.value.trim();

    if(city === ""){
        alert("Vui lòng nhập thành phố");
        return;
    }

    getWeather(city);

});


// ==========================
// Fetch weather
// ==========================

async function getWeather(city){

    showLoading();

    try{

        const response = await fetch(
            `https://wttr.in/${city}?format=j1`
        );

        if(!response.ok){
            throw new Error("Không tìm thấy thành phố");
        }

        const data = await response.json();

        // kiểm tra dữ liệu hợp lệ
        if(!data.current_condition){
            throw new Error("Dữ liệu không hợp lệ");
        }

        const weather = data.current_condition[0];

        showWeather(city, weather);

        saveHistory(city);

    }
    catch(error){

        showError(error.message);

    }

}


// ==========================
// Show loading
// ==========================

function showLoading(){

    loading.classList.remove("hidden");

    weatherResult.classList.add("hidden");

    errorDiv.classList.add("hidden");

}


// ==========================
// Show weather
// ==========================

function showWeather(city, weather){

    loading.classList.add("hidden");

    errorDiv.classList.add("hidden");

    weatherResult.classList.remove("hidden");

    cityName.innerText = city;

    temp.innerText = weather.temp_C;

    humidity.innerText = weather.humidity;

    description.innerText =
        weather.weatherDesc[0].value;

    weatherIcon.src =
        weather.weatherIconUrl[0].value;

}


// ==========================
// Show error
// ==========================

function showError(message){

    loading.classList.add("hidden");

    weatherResult.classList.add("hidden");

    errorDiv.classList.remove("hidden");

    errorDiv.innerText = message;

}


// ==========================
// Local Storage
// ==========================

function saveHistory(city){

    let history =
        JSON.parse(localStorage.getItem("weatherHistory"))
        || [];

    // xóa nếu đã tồn tại
    history = history.filter(item => item !== city);

    // thêm đầu mảng
    history.unshift(city);

    // chỉ giữ 5 thành phố
    history = history.slice(0,5);

    localStorage.setItem(
        "weatherHistory",
        JSON.stringify(history)
    );

    renderHistory();

}


// ==========================
// Render history
// ==========================

function renderHistory(){

    const history =
        JSON.parse(localStorage.getItem("weatherHistory"))
        || [];

    historyList.innerHTML = "";

    history.forEach(city => {

        const li = document.createElement("li");

        li.innerText = city;

        li.addEventListener("click", () => {

            cityInput.value = city;

            getWeather(city);

        });

        historyList.appendChild(li);

    });

}

renderHistory();