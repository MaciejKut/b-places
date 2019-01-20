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
// Initialize and add the map

var infos = document.getElementById('infos');

window.initMap = function () {
    // The location of Uluru
    var uluru = {
        lat: -25.344,
        lng: 131.036
    };
    var coords2 = {
        lat: -25.363,
        lng: 134.044
    };
    var coords3 = {
        lat: -25.363,
        lng: 137.044
    };
    var coords4 = {
        lat: -24.367,
        lng: 135.046
    };
    var coords5 = {
        lat: -26.362,
        lng: 138.040
    };

    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 4,
            center: uluru
        });

    // The marker, positioned at Uluru
    var markerOne = new google.maps.Marker({
        position: uluru,
        map: map
    });
    markerOne.addListener('click', function () {
        // Wewnątrz funcji wpisujemy kod, który ma się wykonać po kliknięciu markera. W tym przykładzie wyświetlimy tekst na stronie. 
        infos.innerHTML = 'You clicked marker One';
    });

    // Dodajemy jeszcze dwa markery, aby sprawdzić czy na pewno kliknięcie każdego z nich wyświetli inny tekst. 

    var markerTwo = new google.maps.Marker({
        position: coords2,
        map: map
    });

    markerTwo.addListener('click', function () {
        infos.innerHTML = 'You clicked marker Two';
    });

    var markerThree = new google.maps.Marker({
        position: coords3,
        map: map
    });

    markerThree.addListener('click', function () {
        infos.innerHTML = 'You clicked marker Three';
    });

    var markerFour = new google.maps.Marker({
        position: coords4,
        map: map
    });

    markerFour.addListener('click', function () {
        infos.innerHTML = 'You clicked marker Four';
    });

    var markerFive = new google.maps.Marker({
        position: coords5,
        map: map
    });

    markerFive.addListener('click', function () {
        infos.innerHTML = 'You clicked marker Five';
    });

    document.getElementById('center-map').addEventListener('click', function (event) {
        event.preventDefault();
        // Najpierw wykorzystujemy metodę panTo w obiekcie map do przesunięcia współrzędnych mapy:
        map.panTo(cords3);

        // A następnie zmieniamy powiększenie mapy:
        map.setZoom(10);
    });

    /* Jak widzisz, guzik "Center map" nagle przeskakuje do docelowych pozycji i powiększenia. 
    
    Jako alternatywę przygotowaliśmy funkcję smoothPanAndZoom, która korzysta z funkcji smoothZoom i smoothPan. Jest to nasz własny kod, który jest przykładem tego w jaki sposób można wykorzystać JavaScript oraz podstawy matematyki do wykonania ciekawych manipulacji. 
    
    Aby zobaczyć ten efekt w akcji, kliknij najpierw guzik "Center map", a następnie "Center smoothly". 
    */

    document.getElementById('center-smooth').addEventListener('click', function (event) {
        event.preventDefault();
        smoothPanAndZoom(map, 7, cords4);
    });


    /* Efekt przejścia, który zaimplementowaliśmy za pomocą funkcji smoothPanAndZoom na pewno nie jest idealny, ponieważ staraliśmy się użyć dość prostego algorytmu. 

    ĆWICZENIE:
    Poświęć 15 minut na próbę zrozumienia algorytmu działania funkcji smoothPanAndZoom. Nie zatrzymuj się na jednej linii na dłużej niż 3 minuty - jeśli nie rozumiesz, idź dalej i spróbuj zrozumieć resztę kodu. 

    Nie bój się używać console.log lub document.write do sprawdzania wartości zmiennych!

    Algorytm tych funkcji trudny do zrozumienia, szczególnie w trzecim tygodniu nauki JavaScript. Nie przejmuj się, jeśli go nie zrozumiesz, Zawsze możesz wrócić do tego przykładu za kilka tygodni. ;)
    */

    var smoothPanAndZoom = function (map, zoom, coords) {
        // Trochę obliczeń, aby wyliczyć odpowiedni zoom do którego ma oddalić się mapa na początku animacji.
        var jumpZoom = zoom - Math.abs(map.getZoom() - zoom);
        jumpZoom = Math.min(jumpZoom, zoom - 1);
        jumpZoom = Math.max(jumpZoom, 3);

        // Zaczynamy od oddalenia mapy do wyliczonego powiększenia. 
        smoothZoom(map, jumpZoom, function () {
            // Następnie przesuwamy mapę do żądanych współrzędnych.
            smoothPan(map, coords, function () {
                // Na końcu powiększamy mapę do żądanego powiększenia. 
                smoothZoom(map, zoom);
            });
        });
    };

    var smoothZoom = function (map, zoom, callback) {
        var startingZoom = map.getZoom();
        var steps = Math.abs(startingZoom - zoom);

        // Jeśli steps == 0, czyli startingZoom == zoom
        if (!steps) {
            // Jeśli podano trzeci argument
            if (callback) {
                // Wywołaj funkcję podaną jako trzeci argument.
                callback();
            }
            // Zakończ działanie funkcji
            return;
        }

        // Trochę matematyki, dzięki której otrzymamy -1 lub 1, w zależności od tego czy startingZoom jest mniejszy od zoom
        var stepChange = -(startingZoom - zoom) / steps;

        var i = 0;
        // Wywołujemy setInterval, który będzie wykonywał funkcję co X milisekund (X podany jako drugi argument, w naszym przypadku 80)
        var timer = window.setInterval(function () {
            // Jeśli wykonano odpowiednią liczbę kroków
            if (++i >= steps) {
                // Wyczyść timer, czyli przestań wykonywać funkcję podaną w powyższm setInterval
                window.clearInterval(timer);
                // Jeśli podano trzeci argument
                if (callback) {
                    // Wykonaj funkcję podaną jako trzeci argument
                    callback();
                }
            }
            // Skorzystaj z metody setZoom obiektu map, aby zmienić powiększenie na zaokrąglony wynik poniższego obliczenia
            map.setZoom(Math.round(startingZoom + stepChange * i));
        }, 80);
    };

    // Poniższa funkcja działa bardzo podobnie do smoothZoom. Spróbuj samodzielnie ją przeanalizować. 
    var smoothPan = function (map, coords, callback) {
        var mapCenter = map.getCenter();
        coords = new google.maps.LatLng(coords);

        var steps = 12;
        var panStep = {
            lat: (coords.lat() - mapCenter.lat()) / steps,
            lng: (coords.lng() - mapCenter.lng()) / steps
        };

        var i = 0;
        var timer = window.setInterval(function () {
            if (++i >= steps) {
                window.clearInterval(timer);
                if (callback) callback();
            }
            map.panTo({
                lat: mapCenter.lat() + panStep.lat * i,
                lng: mapCenter.lng() + panStep.lng * i
            });
        }, 1000 / 30);
    }
};