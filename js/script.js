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
        "Safe", "#a45edb",
        "At risk", "#dd8a3e",
        "Saved", "#c72bbf",
        "Shut down", "#6e6e6e",
        "Retiring", "#efc530",
        /* other */ '#ccc'
      ],
      'circle-opacity': 0.77
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

    var coordinates = e.features[0].geometry.coordinates.slice();
    var name = e.features[0].properties.plantname;
    var status = e.features[0].properties.status;
    var size = e.features[0].properties.gwh2017;
    var retire = e.features[0].properties.retirementyear;

    // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    // Populate the popup and set its coordinates
    // based on the feature found.
    popup.setLngLat(coordinates)
      .setHTML('<h3 style = "color: #ffc83e;">' + name 
      + '</h3><p><span class="label-title">Status: </span>' + status 
      + '</p><p><span class="label-title">Generation: </span>' + size 
      + 'GWh</p><p><span class="label-title">Retirement year: </span>' + retire + '</p>')
      .addTo(map);
  })

})