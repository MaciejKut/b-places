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