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

    return new Chart(document.getElementById("mobile-devices-chart"), config); 
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
            label: "Clicks",
            data: daily_views,
            backgroundColor: "rgb(54, 162, 235, 0.2)",
            borderColor: "rgb(54, 162, 235)",
            borderWidth: 2,
            fill: true,
            lineTension: 0.5
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
            },
            scales: {
                y:{
                    borderColor: "transparent",
                    title: {
                        display: true,
                        text: 'Clicks Count',
                        font: {
                            size: 12,
                            weight: 500
                        },
                        color: "rgb(54, 162, 235)"
                    },
                    suggestedMin: 0,
                    suggestedMax: 2000,
                    ticks: {
                        display: true,
                        callback: function(value, index, ticks){
                            return nFormatter(value, 2);
                        },
                        color: "rgb(54, 162, 235)",
                        font: {
                            size: 12
                        },
                        stepSize: 400
                    },
                    grid: {
                        display: true,
                        color: "rgb(54, 162, 235, 0.25)",
                        borderColor: "transparent"
                    }
                },
                x:{
                    title: {
                        display: true,
                        text: 'Date',
                        font: {
                            size: 12,
                            weight: 500
                        },
                        color: "rgb(54, 162, 235)"
                    },
                    ticks: {
                        color: "rgb(54, 162, 235)"
                    },
                    grid: {
                        display: false,
                        borderColor: "transparent",
                    }
                }
            }
        }
    };

    return new Chart(ctx, config);
}

function nFormatter(num, digits) {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function(item) {
      return num >= item.value;
    });
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}