window.initMap = function () {
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

    flkty.on('change', function (index) {
        //console.log('Flickity change ' + index);
        map.panTo(slidesData[index].coords);
        map.setZoom(5);
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

    // The location of Uluru
    var uluru = slidesData[0].coords;
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 3,
            center: uluru
        });

    var markers = [];

    for (let i = 0; i < slidesData.length; i++) {

        markers[i] = new google.maps.Marker({
            position: slidesData[i].coords,
            map: map
        });

        markers[i].addListener('click', function () {
            flkty.select(i, false, true);
        });

    }


}