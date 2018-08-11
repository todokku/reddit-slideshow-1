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


// Shuffle image list (Durstenfeld algorithm)
var keys = Object.keys(images),
    index = 0;

for (var i = keys.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = keys[i];
    keys[i] = keys[j];
    keys[j] = temp;
}

function slideshow() {
    img = images[keys[index]]; // Show current image and title
    document.body.style.backgroundImage = 'url("img/' + img['file'] + '")';
    document.querySelector('.location').textContent = img['title'];

    index += 1; // Preload next image
    img = images[keys[index]];
    var preload=new Image();                                   
    preload.src = "img/" + img['file'];
}

document.addEventListener('DOMContentLoaded', slideshow);
setInterval(slideshow, 60000);
