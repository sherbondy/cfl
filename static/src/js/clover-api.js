jQuery( document ).ready( function( $ ) {
  var locations = apiResponse.locations;

  function initMap() {
    var styles = [
      {
        "featureType": "water",
        "stylers": [
          { "saturation": -100 },
          { "gamma": 0.25 },
          { "visibility": "simplified" }
        ]
      },{
        "stylers": [
          { "saturation": -100 }
        ]
      },{
        "stylers": [
          { "visibility": "simplified" },
          { "gamma": 1.39 }
        ]
      },{
      }
    ];
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      // center: new google.maps.LatLng(42.3601, -71.0589),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    map.setOptions({styles: styles});

    if(navigator.geolocation) {
      browserSupportFlag = true;
      navigator.geolocation.getCurrentPosition(function(position) {
        initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
        map.setCenter(initialLocation);
      }, function() {
        handleNoGeolocation(browserSupportFlag);
      });
    }
    // Browser doesn't support Geolocation
    else {
      browserSupportFlag = false;
      handleNoGeolocation(browserSupportFlag);
    }

    function handleNoGeolocation(errorFlag) {
      if (errorFlag == true) {
        // alert("Geolocation service failed.");
        initialLocation = new google.maps.LatLng(42.3601, -71.0589);
      } else {
        // alert("Your browser doesn't support geolocation. We've placed you in Siberia.");
        initialLocation = new google.maps.LatLng(42.3601, -71.0589);
      }
      map.setCenter(initialLocation);
    }

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i].latitude, locations[i].longitude),
        map: map
      });

      google.maps.event.addListener(marker, 'click', ( function(marker, i) {
        return function() {
          infowindow.setContent(locations[i].description);
          infowindow.open(map, marker);
        };
      })(marker, i));
    }
  }

  var today = moment().format('dddd');
  // var now = moment().format('HH:mm:ss');
  var now = moment('21:32:24', 'HH:mm:ss').format();
  console.log(today);
  console.log(now);

  function findToday(location) {
    let meals = location.meals;
    console.log(meals);
  }

  function addLocationItem(location, i) {
    let $locationItem = $('.location-item');
    let address = `${location.address_street_1} ${location.address_city}, ${location.address_state} ${location.address_zip_code}`;

    $locationItem.first().clone().appendTo('.locations-mod').addClass(`locations-mod--${i}`);
    let $this = $(`.locations-mod--${i}`);
    $this.find('.location__title__name').text(location.description)
    $this.find('.location__title__distance').text('0.2mi')
    $this.find('.location__status').text('Closed')
    $this.find('.location__twitter').text(`@${location.twitter}`).attr('href', `https://twitter.com/${location.twitter}`)
    $this.find('.location__address').text(address).attr('href', `http://maps.google.com/?q=${address}`);

    $locationItem.eq(i).addClass('js-has-data');
  }

  function initLocations() {
    locations.forEach(function(location, i) {
      addLocationItem(location, i)
      findToday(location);

    });

    $('.location-item').eq(0).remove();
  }

  initMap();
  initLocations();
  console.log(locations);


});
