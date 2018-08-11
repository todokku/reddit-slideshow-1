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

var keys = Object.keys(images),
    index = 0;

function shuffle() {
    // Shuffle image list (Durstenfeld algorithm)
    for (var i = keys.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = keys[i];
        keys[i] = keys[j];
        keys[j] = temp;
    }

    slideshow();
}

function slideshow() {
    // Show current image and title
    img = images[keys[index]];
    document.body.style.backgroundImage = 'url("img/' + img['file'] + '")';
    document.querySelector('.location').textContent = img['title'];

    // Preload next image
    index += 1;
    img = images[keys[index]];
    var preload=new Image();                                   
    preload.src = "img/" + img['file'];
}

document.addEventListener('DOMContentLoaded', shuffle);
setInterval(slideshow, 60000);
