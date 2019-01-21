//console.log('Wartość obiektu Slides Data' + slidesData);
var slides = document.getElementById('template-slide-list').innerHTML;
//console.log('Wartość slides po pobraniu' + slides);

Mustache.parse(slides);
var listSlides = '';

for (var i = 0; i < slidesData.length; i++) {
    // console.log(slidesData);
    listSlides += Mustache.render(slides, slidesData[i]);
}

//console.log('Wartość listSlides po pętli ' + listSlides);
//console.log(typeof (listSlides));

var results = document.getElementById('slidesContainer');
results.innerHTML = listSlides;

//console.log(results);

var elem = document.querySelector('.main-carousel');
var flkty = new Flickity(elem, {
    // options
    initialIndex: 2,
    cellAlign: 'center',
    contain: true,
    freeScroll: true,
    draggable: '>1',
    hash: true,
    imagesLoaded: true,
    pageDots: false
});



var progressBar = document.querySelector('.progress-bar')

flkty.on('scroll', function (progress) {
    progress = Math.max(0, Math.min(1, progress));
    progressBar.style.width = progress * 100 + '%';
});

var previousButton = document.querySelector('.button--previous');
previousButton.addEventListener('click', function () {
    flkty.previous();
});
var previousWrappedButton = document.querySelector('.button--previous-wrapped');
previousWrappedButton.addEventListener('click', function () {
    flkty.previous(true);
});

// Initialize and add the map
window.initMap = function () {
    // The location of Uluru
    var uluru = slidesData[0].coords;
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 3,
            center: uluru
        });

    var markers = [];
    var posId = {};
    for (let i = 0; i < slidesData.length; i++) {
        console.log('value of ' + i);
        markers[i] = new google.maps.Marker({
            position: slidesData[i].coords,
            map: map
        });
        console.log(' markers[i] ' + markers[i]);
        markers[i].addListener('click', function () {
            console.log('value of i wewnątrz markers ' + i);
            console.log('cliknięto w marker' + i);
            flkty.select(i, false, true);
        });
        console.log(' markers[i] ' + markers[i]);
    }
    console.log('value of i 4th chck' + i);

}