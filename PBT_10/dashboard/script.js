const usersWidget =
    document.getElementById("widget-users");

const weatherWidget =
    document.getElementById("widget-weather");

const dogWidget =
    document.getElementById("widget-dog");

const globalLoading =
    document.getElementById("globalLoading");

const fetchTime =
    document.getElementById("fetchTime");

const refreshBtn =
    document.getElementById("refreshBtn");


// ======================================
// Widget loading states
// ======================================

function showWidgetLoading(){

    usersWidget.innerHTML =
        `<p class="loading">Loading users...</p>`;

    weatherWidget.innerHTML =
        `<p class="loading">Loading weather...</p>`;

    dogWidget.innerHTML =
        `<p class="loading">Loading dog image...</p>`;

}


// ======================================
// Render success
// ======================================

function renderWidget(index,data){

    // USERS
    if(index === 0){

        usersWidget.innerHTML =
            data.slice(0,5).map(user => `
                <div class="user-item">
                    <strong>${user.name}</strong>
                    <p>${user.email}</p>
                </div>
            `).join("");

    }

    // WEATHER
    else if(index === 1){

        const weather =
            data.current_weather;

        weatherWidget.innerHTML = `
            <div class="weather-box">

                <h3>Hanoi</h3>

                <p>
                    Temperature:
                    ${weather.temperature}°C
                </p>

                <p>
                    Wind Speed:
                    ${weather.windspeed} km/h
                </p>

            </div>
        `;

    }

    // DOG IMAGE
    else if(index === 2){

        dogWidget.innerHTML = `
            <img
                class="dog-img"
                src="${data.message}"
                alt="Dog"
            >
        `;

    }

}


// ======================================
// Render error
// ======================================

function renderWidgetError(index,message){

    const errorHTML = `
        <p class="error">
            ${message}
        </p>
    `;

    if(index === 0){

        usersWidget.innerHTML = errorHTML;

    }

    else if(index === 1){

        weatherWidget.innerHTML = errorHTML;

    }

    else if(index === 2){

        dogWidget.innerHTML = errorHTML;

    }

}


// ======================================
// Load dashboard
// ======================================

async function loadDashboard(){

    globalLoading.style.display = "block";

    showWidgetLoading();

    const startTime = Date.now();

    const results =
        await Promise.allSettled([

            // USERS API
            fetch(
                "https://jsonplaceholder.typicode.com/users"
            ).then(r => {

                if(!r.ok){
                    throw new Error("Users API failed");
                }

                return r.json();

            }),

            // WEATHER API
            fetch(
                "https://api.open-meteo.com/v1/forecast?latitude=21.03&longitude=105.85&current_weather=true"
            ).then(r => {

                if(!r.ok){
                    throw new Error("Weather API failed");
                }

                return r.json();

            }),

            // DOG API
            fetch(
                "https://dog.ceo/api/breeds/image/random123"
            ).then(r => {

                if(!r.ok){
                    throw new Error("Dog API failed");
                }

                return r.json();

            })

        ]);


    results.forEach((result,index) => {

        if(result.status === "fulfilled"){

            renderWidget(
                index,
                result.value
            );

        }
        else{

            renderWidgetError(
                index,
                result.reason.message
            );

        }

    });


    const totalTime =
        Date.now() - startTime;

    fetchTime.innerText =
        `Data loaded in ${totalTime} ms`;

    globalLoading.style.display = "none";

    console.log(
        `Loaded in ${totalTime}ms`
    );

}


// ======================================
// Refresh button
// ======================================

refreshBtn.addEventListener("click", () => {

    loadDashboard();

});


// ======================================
// Initial load
// ======================================

loadDashboard();