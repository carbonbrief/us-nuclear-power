if (!mapboxgl.supported()) {
    alert('Your browser does not support Mapbox GL');
  } else {

var map = new mapboxgl.Map({
    container: 'map', // container id
    style: {
        "version": 8,
        "sources": {
            "simple-tiles": {
                "type": "raster",
                // point to our third-party tiles. Note that some examples
                // show a "url" property. This only applies to tilesets with
                // corresponding TileJSON (such as mapbox tiles). 
                "tiles": [
                   "http://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
                    "http://b.tile.openstreetmap.org/{z}/{x}/{y}.png"
                ],
                "tileSize": 256
            }
        },
        "layers": [{
            "id": "simple-tiles",
            "type": "raster",
            "source": "simple-tiles",
            "minzoom": 0,
            "maxzoom": 22
        }]
    },
    center: [-120, 10], // starting position
    zoom: 3.5, // starting zoom
    maxZoom: 16
});
/*var map = new mapboxgl.Map({
        container: 'map',
        style: 'https://openmaptiles.github.io/positron-gl-style/style-cdn.json',
        center: [-108, 37],
        zoom: 3.7,
        maxZoom: 16,
        scrollZoom: false

    });*/

// variable to use throughout
var screenWidth = $(window).width();

var boundsMobile = [
  [ -135, 22],[-62, 50]
]

var boundsLaptop = [
  [ -135, 22],[-62, 56]
]

var boundsDesktop = [
  [ -160, 28],[-68, 44]
]

var boundsRetina = [
  [ -160, 24],[-64, 46]
]

function getBounds () {
  // 850 pixels is the screen width below which the charts get hidden
  if (screenWidth > 1400) {
      return boundsRetina
  }
  else if (screenWidth > 1024 && screenWidth < 1400) {
      return boundsDesktop
  } 
  else if (1024 > screenWidth && screenWidth > 850) {
      return boundsLaptop
  } else {
      return boundsMobile
  }
}

var bounds = getBounds();

console.log(bounds);

// resize map for the screen
map.fitBounds(bounds, {padding: 10});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

map.on('load', function() {

  map.addLayer({
    id: "plants",
    type: "circle",
    source: {
      type: 'geojson',
      data: './data/map.geojson'
    },
    paint: {
      'circle-radius': {
        property: 'gwh2017',
        type: 'exponential',
        base: 1,
        stops: [
          [{zoom: 1, value: 0}, 1],
          [{zoom: 1, value: 35000}, 20],
          [{zoom: 4, value: 0}, 3],
          [{zoom: 4, value: 35000}, 27],
          [{zoom: 8, value: 0}, 4.5],
          [{zoom: 8, value: 35000}, 32],
          [{zoom: 12, value: 0}, 6],
          [{zoom: 12, value: 35000}, 37]
        ]
      },
      'circle-color': [
        'match',
        ['get', 'status'],
        "Operating", "#a45edb",
        "At risk", "#dd8a3e",
        "Kept open", "#c72bbf",
        "Shut down", "#5a5a5a",
        "Retiring", "#efc530",
        /* other */ '#ccc'
      ],
      'circle-opacity': 0.85
    }
  })

  // Create a popup, but don't add it to the map yet.
  var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
  });

  map.on('mouseenter', 'plants', function(e) {
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = 'pointer';

    var colorsArray = {
      "Operating": "#a45edb",
      "At risk": "#dd8a3e",
      "Kept open": "#c72bbf",
      "Shut down": "#5a5a5a",
      "Retiring": "#efc530"
    }

    var getIcon = {
      "Operating": "safe",
      "At risk": "atrisk",
      "Kept open": "saved",
      "Shut down": "shutdown",
      "Retiring": "retiring"
    }

    var coordinates = e.features[0].geometry.coordinates.slice();
    var name = e.features[0].properties.plantname;
    var status = e.features[0].properties.status;
    var size = Math.round(e.features[0].properties.gwh2017);
    var retire = e.features[0].properties.retirementyear;
    var plantColor = colorsArray[e.features[0].properties.status];

    var icon = getIcon[status];

    // add thousands separators to data
    var sizeString = size.toLocaleString('en');
    
    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    // Populate the popup and set its coordinates
    // based on the feature found.
    popup.setLngLat(coordinates)
      .setHTML('<div class="icon" style="background-image:url(./img/nuclear-' + icon 
      + '.svg); float: right;"></div><h3 style = "color: ' + plantColor + ';">' + name 
      + '</h3><p><span class="label-title">Status: </span>' + status 
      + '</p><p><span class="label-title">Generation: </span>' + sizeString 
      + ' GWh</p><p><span class="label-title">Retirement year: </span>' + retire + '</p>')
      .addTo(map);

  });

  map.on('mouseleave', 'plants', function() {
    map.getCanvas().style.cursor = '';
    popup.remove();
  });

})

// TOGGLE BUTTON

$(".toggle").click(function() {
  $("#console").toggleClass('console-close console-open');
  $('.arrow-right-hidden').toggleClass('arrow-right');
  $('.arrow-left').toggleClass('arrow-left-hidden');
});
}
