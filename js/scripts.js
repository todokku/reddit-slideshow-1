// Clock
// -----

function clock() {
    var time = new Date(),
        hours = time.getHours(),
        minutes = time.getMinutes();

    document.querySelectorAll('.clock')[0].innerHTML = 
        ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2); // add a 0 before one-digit numbers
}

document.addEventListener('DOMContentLoaded', clock);
setInterval(clock, 1000);


// Slideshow
// ---------

var keys = Object.keys(list);
var rand = list[keys[ keys.length * Math.random() << 0]];  // Select the first image randomly

function slideshow() {
    document.body.style.backgroundImage = 'url("img/' + rand['file'] + '")'; // Update image
    document.querySelector('.location').textContent = rand['title'];         // Update title

    rand = list[keys[ keys.length * Math.random() << 0]];  // Select next image randomly
    var img=new Image();                                   // Preload next image
    img.src = "img/" + rand['file'];
}

document.addEventListener('DOMContentLoaded', slideshow);
setInterval(slideshow, 60000);
