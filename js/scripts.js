function clock() {
    var time = new Date(),
        hours = time.getHours(),
        minutes = time.getMinutes();

    document.querySelectorAll('.clock')[0].innerHTML = 
        ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2);
}

document.addEventListener('DOMContentLoaded', clock);
setInterval(clock, 1000);
