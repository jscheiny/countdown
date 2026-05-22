let DATA = {
    c1: {
        endDate: new Date(2014 + 18, 10, 2),
        backgroundColor: "#004D46",
    },
    c2: {
        endDate: new Date(2017 + 18, 3, 7),
        backgroundColor: "#5C255C",
    },
    c3: {
        endDate: new Date(2020 + 18, 6, 21),
        backgroundColor: "#77450D",
    }
};

document.addEventListener("DOMContentLoaded", update)
window.addEventListener("hashchange", update);
setInterval(update, 1000);

function update() {
    let selected = getSelected();
    let { endDate, backgroundColor } = DATA[selected];
    let difference = endDate.getTime() - Date.now();
    formatDifference(difference);
    document.body.style.backgroundColor = backgroundColor;
    document.querySelectorAll("a").forEach(element => {
        element.className = "";
    });
    document.getElementById(selected).className = "selected";

}

function getSelected() {
    let hash = window.location.hash.substring(1);
    if (hash in DATA) {
        return hash
    } else {
        return "c3";
    }
}

function formatDifference(diff) {
    let secondsDiff = Math.floor(diff / 1000);
    let seconds = secondsDiff % 60;

    let minutesDiff = Math.floor(secondsDiff / 60);
    let minutes = minutesDiff % 60;

    let hoursDiff = Math.floor(minutesDiff / 60);
    let hours = hoursDiff % 24;

    let daysDiff = Math.floor(hoursDiff / 24);
    let days = daysDiff % 365;

    let years = Math.floor(daysDiff / 365);

    updateField("years", years);
    updateField("days", days);
    updateField("hours", hours);
    updateField("minutes", minutes);
    updateField("seconds", seconds);
}


function updateField(field, value) {
    document.querySelector(`.${field}.value`).innerText = String(value);
    document.querySelector(`.${field}.label`).innerText
        = value == 1 ? field.substring(0, field.length - 1) : field;
}