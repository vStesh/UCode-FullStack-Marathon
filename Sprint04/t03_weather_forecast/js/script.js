'use strict'
let api_key = '51a420f48ed50b449a833d44de9b531f';
let div = document.querySelector('#forecast');
let weekDay = ['Нед', 'Пон', 'Вівт', 'Сер', 'Чт', 'Птн', 'Сб'];

let formatDate = (date) => {
    let f_date = new Intl.NumberFormat('en-IN', {minimumIntegerDigits: 2}).format(date);

    return f_date;
}

let renderOutput = (dataArr, geo) => {
    
    let render = `<div class="geo-title">Погода на 7 днів для: ${geo}</div>`;
    render += '<div class="weather_week row">';
    dataArr.forEach((item, key, arr) => {
        let objDate = new Date(item.dt * 1000);
        let date = formatDate(objDate.getDate()) + '.' + formatDate(objDate.getMonth() + 1);
        // console.log(item);
        // console.log(item.temp.day);
        
        render += `<div class="card">
        <div class="date">
            <span>${date}</span>
        </div>
        <div class="weekday">${weekDay[objDate.getDay()]}</div>
        <div class="w-image"><img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png" alt="icon"></div>
        <div class="desc">${item.weather[0].description}</div>
        <div class="temp-row">
            <div class="temp-night">
                <div class="title1">ніч</div>
                <div class="temp1">${(Math.round(item.temp.night) >0 ? '+' : '') + Math.round(item.temp.night)}</div>
            </div>
            <div class="temp-morn">
                <div class="title1">ранок</div>
                <div class="temp1">${(Math.round(item.temp.morn) >0 ? '+' : '') + Math.round(item.temp.morn)}</div>
            </div>
            <div class="temp-day">
                <div class="title1">день</div>
                <div class="temp1">${(Math.round(item.temp.day) >0 ? '+' : '') + Math.round(item.temp.day)}</div>
            </div>
            <div class="temp-eve">
                <div class="title1">вечір</div>
                <div class="temp1">${(Math.round(item.temp.eve) >0 ? '+' : '') + Math.round(item.temp.eve)}</div>
            </div>
        </div>
        <div class="temp-row">
        <div class="temp-min">
                <div class="title">max</div>
                <div class="temp">${(Math.round(item.temp.min) >0 ? '+' : '') + Math.round(item.temp.min)}</div>
            </div>
            <div class="temp-max">
                <div class="title">min</div>
                <div class="temp">${(Math.round(item.temp.max) >0 ? '+' : '') + Math.round(item.temp.max)}</div>
            </div>
        </div>

    </div>`;
    });
    render += '</div>';
    div.insertAdjacentHTML('beforeend', render);
} 

let getForecast = async (lat, lon, geo) => {
    let weather = fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=ua&exclude=current,minutely,hourly,alerts&cnt=6&units=metric&appid=${api_key}`)
        .then(response => response.json())
        .then(data => {
            renderOutput(data.daily, geo);
            
             // console.log(data);
            // data.daily.map((day) => {
            //     console.log(day);
            // });
        });
}

let start = async () => {
    try {
        if(navigator.geolocation) {
            //console.log(position.coords.latitude, position.coords.longitude);
            navigator.geolocation.getCurrentPosition(position => {
                getForecast(position.coords.latitude, position.coords.longitude, 'Ваша локація');
            });
        } else {
            getForecast(50.45466, 30.5238, 'Kyiv');
        }

    } catch (err) {
        console.log(err);
    }
}


start();   