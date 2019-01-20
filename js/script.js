console.log('Wartość obiektu Slides Data' + slidesData);
var slides = document.getElementById('template-slide-list').innerHTML;
console.log('Wartość slides po pobraniu' + slides);

Mustache.parse(slides);
var listSlides = '';

for (var i = 0; i < slidesData.length; i++) {
    console.log(slidesData);
    listSlides += Mustache.render(slides, slidesData[i]);
}

console.log('Wartość listSlides po pętli ' + listSlides);
console.log(typeof (listSlides));

var results = document.getElementById('slidesContainer');
results.innerHTML = listSlides;

console.log(results);

var elem = document.querySelector('.main-carousel');
var flkty = new Flickity(elem, {
    // options
    cellAlign: 'center',
    contain: true,
    freeScroll: true,
    draggable: '>1',
    hash: true,
    imagesLoaded: true,
    cellSelector: '.carousel-cell',
    pageDots: false
});

var progressBar = document.querySelector('.progress-bar')

flkty.on('scroll', function (progress) {
    progress = Math.max(0, Math.min(1, progress));
    progressBar.style.width = progress * 100 + '%';
});