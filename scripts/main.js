(function ($) {
    "use strict";
    
    // Initiate the wowjs
    new WOW().init();
})(jQuery);

document.addEventListener("DOMContentLoaded", pageLoad);
let dates_of_month = [];
let daily_views = [];

function pageLoad(){
    createMobileDevicesChart();
    createRandomDataForDailyClicks();
}

function copyText(inputElement){
    let element = '';
    if(inputElement == "openonapp"){
        element = document.getElementById("openonapplink");
    }
    else{
        element = document.getElementById("youtubelink");
    }
    element.select();
    element.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(element.value);
}

function openPage(inputElement){
    let element = '';
    if(inputElement == "openonapp"){
        element = document.getElementById("openonapplink");
    }
    else{
        element = document.getElementById("youtubelink");
    }
    window.open(element.value, "_blank");
}

function createMobileDevicesChart(){
    document.getElementById("mobile-devices-chart");
    const data = {
        labels: [
            'Android',
            'Windows',
            'Apple'
        ],
        datasets: [{
            label: 'Top 3 Devices',
            data: [1404, 189, 30],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    };

    const config = {
        type: 'doughnut',
        data: data,
        options: {
            plugins: {
                legend: {
                    display: false
                }
            },
            cutout: "80%"
        }
    };

    const mobile_devices_chart = new Chart(document.getElementById("mobile-devices-chart"), config); 
}

function createRandomDataForDailyClicks(){
    for(let i = 1; i <= 31; i++){
        dates_of_month.push(i);
        daily_views.push(getRndInteger(200, 2000));
    }

    console.log(dates_of_month);
    console.log(daily_views);
    createDailyClicksChart();
}

function getRndInteger(min, max){
    return Math.floor(Math.random() * (max - min) ) + min;
}

function createDailyClicksChart(){
    const ctx = document.getElementById("daily_clicks_canvas");
    const data = {
        labels: dates_of_month,
        datasets: [{
            data: daily_views,
            backgroundColor: "rgb(54, 162, 235, 0.2)",
            borderColor: "rgb(54, 162, 235)",
            borderWidth: 2,
            fill: true,
            lineTension: 0.4
        }]
    };
    const config = {
        type: 'line',
        data: data,
        options: {
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    };

    return new Chart(ctx, config);
}