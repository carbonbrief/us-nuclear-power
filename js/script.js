if (!mapboxgl.supported()) {
    alert('Your browser does not support Mapbox GL');
  } else {
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'https://openmaptiles.github.io/positron-gl-style/style-cdn.json',
        center: [-100, 40],
        zoom: 3.5,
        maxZoom: 18
    });
}

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
          [{zoom: 12, value: 35000}, 37],
          [{zoom: 17, value: 0}, 8],
          [{zoom: 17, value: 35000}, 42]
        ]
      },
      'circle-color': [
        'match',
        ['get', 'status'],
        "Safe", "#ced1cc",
        "At risk", "#4e80e5",
        "Saved", "#ffc83e",
        "Shut down", "#333333",
        "Retiring", "#a45edb",
        /* other */ '#ccc'
      ],
      'circle-opacity': 0.77
    }
  })

})