(function ($) {
    "use strict";
    
    // Initiate the wowjs
    new WOW().init();
})(jQuery);

document.addEventListener("DOMContentLoaded", pageLoad);
let dates_of_month = [];
let daily_views = [];
let window_width = window.innerWidth;
let window_height = window.innerHeight;

function pageLoad(){
    createMobileDevicesChart();
    createRandomDataForDailyClicks();
    createStatesPieChart();
    createCountriesBarChart();
    addResizeEvent();
}

function copyText(inputElement){
    let element = '';
    if(inputElement == "openonapp"){
        element = document.getElementById("openonapplink");
    }
    else if(inputElement == "info"){
        element = document.getElementById("infolink");
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
    else if(inputElement == "info"){
        element = document.getElementById("infolink");
    }
    else{
        element = document.getElementById("youtubelink");
    }
    window.open(element.value, "_blank");
}

function createMobileDevicesChart(){
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

function createStatesPieChart(){
    const data = {
        labels: [
            "Delhi/NCR",
            "Rajasthan",
            "Uttar Pradesh",
            "West Bengal"
        ],
        datasets: [{
            label: "Top States",
            data: [ 764, 111, 173, 329 ],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                '#bc2a8d'
            ],
            hoverOffset: 4
        }]
    }

    const config = {
        type: 'doughnut',
        data: data,
        options: {
            plugins: {
                legend: {
                    display: false
                }
            },
            cutout: "30%"
        }
    };

    return new Chart(document.getElementById("states_chart_container"), config);
}

function createCountriesBarChart(){
    const data = {
        labels: [
            "India",
            "United States",
            "Ireland",
            "France",
            "Germany"
        ],
        datasets: [{
            label: "Traffic",
            data: [ 1381, 436, 271, 133, 90 ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(188, 42, 141)',
                'rgb(64, 173, 168)'
            ],
            borderWidth: 1,
            backgroundColor: [
                'rgb(255, 99, 132, 0.5)',
                'rgb(54, 162, 235, 0.5)',
                'rgb(255, 205, 86, 0.5)',
                'rgb(188, 42, 141, 0.5)',
                'rgb(64, 173, 168, 0.5)'
            ],
            barPercentage: 0.2,
            borderRadius: 5
        }]
    };

    const config = {
        type: "bar",
        data: data,
        options: {
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '# of Visitors',
                        font: {
                            size: 12,
                            weight: 500
                        },
                        color: "rgb(54, 162, 235)"
                    },
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
                x: {
                    title: {
                        display: true,
                        text: 'Country',
                        font: {
                            size: 12,
                            weight: 500
                        },
                        color: "rgb(54, 162, 235)"
                    },
                    ticks: {
                        autoSkip: false,
                        maxRotation: 0,
                        minRotation: 0,
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

    return new Chart(document.getElementById("countries_bar_graph"), config);
}

function addResizeEvent(){
    window.addEventListener("resize", (event) => {
        if(Math.abs(event.target.innerWidth - window_width) >= 200){
            console.log("if condition");
            console.log("width gap: " + Math.abs(event.target.innerWidth - window_width));
            window.location.reload();
        }
    })
}