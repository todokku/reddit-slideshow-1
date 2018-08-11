// Clock

function clock() {
    var time = new Date(),
        hours = time.getHours(),
        minutes = time.getMinutes();

    document.querySelectorAll('.clock')[0].innerHTML = 
        ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2);
}

document.addEventListener('DOMContentLoaded', clock);
setInterval(clock, 1000);


// Slideshow

function slideshow() {
    var keys = Object.keys(list);
    var rand =  list[keys[ keys.length * Math.random() << 0]];
    document.body.style.backgroundImage = 'url("img/' + rand['file'] + '")';
    document.querySelector('.location').textContent = rand['title'];
}

document.addEventListener('DOMContentLoaded', slideshow);
setInterval(slideshow, 10000);
