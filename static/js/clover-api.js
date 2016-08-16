'use strict';

jQuery(document).ready(function ($) {
  var locations = apiResponse;
  var eachLocation = locations.locations;
  var apiURL = 'https://menu.cloverfoodlab.com/api/';
  var themeLoc = '/wp-content/themes/clover-theme';

  function initMap(lat, lng) {
    var styles = [{
      "featureType": "water",
      "stylers": [{ "saturation": -100 }, { "gamma": 0.25 }, { "visibility": "simplified" }]
    }, {
      "stylers": [{ "saturation": -100 }]
    }, {
      "stylers": [{ "visibility": "simplified" }, { "gamma": 1.39 }]
    }, {}];
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      scrollwheel: false,
      // center: new google.maps.LatLng(42.3601, -71.0589),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    // map.setOptions({styles: styles});
    if (lat && lng) {
      map.setCenter(new google.maps.LatLng(lat, lng));
      map.setZoom(15);
    } else {

      var initialLocation = new google.maps.LatLng(42.3601, -71.0589);
      map.setCenter(initialLocation);
      // if(navigator.geolocation) {
      //   browserSupportFlag = true;
      //   navigator.geolocation.getCurrentPosition(function(position) {
      //     initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
      //     map.setCenter(initialLocation);
      //   }, function() {
      //     handleNoGeolocation(browserSupportFlag);
      //   });
      // }
      // // Browser doesn't support Geolocation
      // else {
      //   browserSupportFlag = false;
      //   handleNoGeolocation(browserSupportFlag);
      // }

      // function handleNoGeolocation(errorFlag) {
      //   if (errorFlag === true) {
      //     // alert("Geolocation service failed.");
      //     initialLocation = new google.maps.LatLng(42.3601, -71.0589);
      //   } else {
      //     // alert("Your browser doesn't support geolocation. We've placed you in Siberia.");
      //     initialLocation = new google.maps.LatLng(42.3601, -71.0589);
      //   }
      //   map.setCenter(initialLocation);
      // }
    }

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < eachLocation.length; i++) {
      var locationStatus = isThisOpen(eachLocation[i]) ? 'open' : 'closed';
      var locationType = isThisATruck(eachLocation[i]) ? 'truck' : 'store';
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(eachLocation[i].latitude, eachLocation[i].longitude),
        map: map,
        icon: themeLoc + '/static/img/icon--' + (isThisATruck(eachLocation[i]) ? 'truck' : 'store') + '-' + (isThisOpen(eachLocation[i]) ? 'open' : 'closed') + '.svg'
      });

      google.maps.event.addListener(marker, 'mouseover', function (marker, i) {
        return function () {
          infowindow.setContent(eachLocation[i].description);
          infowindow.open(map, marker);
        };
      }(marker, i));

      google.maps.event.addListener(marker, 'mouseout', function (marker, i) {
        return function () {
          infowindow.close();
        };
      }(marker, i));

      google.maps.event.addListener(marker, 'click', function (marker, i) {
        return function () {
          window.location.replace('/locations/location/?l=' + eachLocation[i].slug);
        };
      }(marker, i));
    }
  }

  var today = moment().format('dddd');
  // var now = moment().format('HH:mm:ss');
  var now = moment('21:32:24', 'HH:mm:ss').format();
  console.log(today);
  console.log(now);

  function findToday(location) {
    var meals = location.meals;
  }

  function isThisOpen(location) {
    return location.is_operating;
  }

  function isThisATruck(location) {
    return location.is_truck;
  }

  function buildLocationItem(location, i) {
    var address = location.address_street_1 + ' ' + location.address_city + ', ' + location.address_state + ' ' + location.address_zip_code;
    var thisLocationID = 'locations-mod-' + i;
    var distance = Math.round((i + 1) * .1 * 10) / 10 + 'mi';
    var currentStatus = isThisOpen(location) ? 'Open until 7:30pm' : 'Closed';
    var currentStatusClass = isThisOpen(location) ? 'location-item--open' : 'location-item--closed';
    var twitterUrl = 'https://twitter.com/' + location.twitter;
    var googleUrl = 'http://maps.google.com/?q=' + address;
    console.log(location);

    var $locationItem = '\n    <li class="location-item js-has-data ' + currentStatusClass + '" id="' + thisLocationID + '" data-status="' + isThisOpen(location) + '" data-truck="' + isThisATruck(location) + '">\n      <a class="location-item-inner location-item-inner--' + location.slug + '" href="' + window.location.href.split('/locations')[0] + '/locations/location/?l=' + eachLocation[i].slug + '">\n        <div class="location-tease__img" style="background-image: url(\'' + location.photo_url + '\')"> </div>\n        <div class"location-tease__hgroup">\n          <h3 class="location__title">\n              <span class="location__title__name">' + location.description + '</span>\n              <span class="location__title__distance">' + distance + '</span>\n          </h3>\n          <h4 class="location__status">' + currentStatus + '</h4>\n        </div>\n      </a>\n    </li>';
    // <a class="location__twitter" href="${twitterUrl}" target="_blank">@${location.twitter}</a>
    // <a class="location__address" href="${googleUrl}" target="_blank">${address}</a>
    // <dl class="location__hours">
    //   <dt>Hours</dt>
    //   <dd class="location__hours__day"></dd>
    // </dl>
    // $locationItem.eq(i).addClass('js-has-data');
    $('.locations-mod').append($locationItem);
  }

  function buildLocationsIndex() {
    eachLocation.forEach(function (location, i) {
      buildLocationItem(location, i);
      findToday(location);
    });
  }

  function parseURL(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  function setCurrentPage(location) {
    var expectedLoc = parseURL('l');
    var thisLocation = void 0;

    location.forEach(function (loc, i) {
      if (loc.slug === expectedLoc) {
        thisLocation = loc;
      }
    });

    return thisLocation;
  }

  function buildMenuItem(meal, slug) {
    // console.log(meal);
    var menuItem = '\n    <li class="default-repeater__item default-repeater__item--menu">\n      <h4 class="default-repeater__title">Today&rsquo;s ' + meal.name + ' Menu <span class="menu-info__hours">Served Sundays: 11am–9pm, Mon to Sat: 11am–12am</span></h4>\n      <div class="default-repeater__content default-repeater__content--' + meal.slug + '">\n      </div>\n    </li>';

    $('.default-repeater__item--menu').last().after(menuItem);
  }

  function replaceMarkDown(val) {
    val = val.replace(/\*\*.+\*\*/g, function (match, dec) {
      return '<b class="more-info__title">' + match + '</b>';
    });
    return val.replace(/\*\*/gi, "");
  }

  function buildMenu(meal, slug, i) {

    var menuApiCall = $.getJSON(apiURL + 'location/' + slug + '/meal/' + meal.slug);
    menuApiCall.done(function (data) {
      // build categories
      // console.log(data);
      //
      var categories = data.categories;
      for (var key in categories) {
        var category = categories[key];
        $('.default-repeater__content--' + meal.slug).append('<li class="menu__cat" data-cat="' + key + '-' + i + '"><h6 class="menu__cat-title">' + category.description + '</h6></li>');
      }

      // build items
      var items = data.items;
      for (var key in items) {
        var item = items[key];
        var itemCat = item.category;
        var itemName = item.description;
        var isNew = item.is_new ? '<span class="js-is-new">New </span>' : '';
        var soldOutClass = item.availability != 1 ? 'js-is-not-available' : 'js-is-available';
        var price = '<span class="menu-price">$' + item.price + '</span>';
        var itemImg = item.photo_url ? '<img class="menu-img" src="' + item.photo_url + '">' : '';
        var info = item.long_description.length ? '\n          <div class="menu-info__mod">\n            <button class="menu-info__trigger menu-info__trigger--open">?</button>\n            <div class="menu-info__modal">\n              ' + itemImg + '\n              <div class="menu-info__modal--width">\n                <button class="menu-info__trigger menu-info__trigger--close">&times;</button>\n                <h2 class="menu-info__modal-title">' + item.description + '</h2>\n                ' + replaceMarkDown(item.long_description) + '\n              </div>\n            </div>\n          </div>' : '';

        // console.log(item);

        $('[data-cat=\'' + itemCat + '-' + i + '\']').append('\n            <div class="menu__item ' + soldOutClass + '">\n              <span class="menu__item-name">' + isNew + ' ' + itemName + ' ' + info + '</span> ' + price + '\n            </div>');
      }
    });
  }

  function setMenu(currentLocation) {
    var meals = currentLocation.meals;
    var slug = currentLocation.slug;
    // console.log(meals);
    var allMeals = [];
    meals.forEach(function (meal, i) {
      if ($.inArray(meal.slug, allMeals) == -1) {
        buildMenuItem(meal, slug);
        buildMenu(meal, slug, i);
        allMeals.push(meal.slug);
        // console.log(meal);
      }
      // console.log(meal);
      // console.log(allMeals);
    });

    $('.default-repeater__item--menu:eq(0)').remove();
  }

  function setSingleTopperInfo(location) {
    var address = location.address_street_1 + ' ' + location.address_city + ', ' + location.address_state + ' ' + location.address_zip_code;
    $('.location-address').text(address).attr('href', 'http://maps.google.com/?q=' + address);
    $('.location-topper__title').text(location.description);
    $('.location-topper__twitter').text('@' + location.twitter).attr('href', 'https://twitter.com/' + location.twitter);

    if (isThisOpen(location)) {
      $('body').addClass('js-location-is-open');
      $('.default-repeater__item--menu:eq(0)').addClass('js-repeater-is-open');
      $('.location-topper__status').text('Open');
    } else {
      $('body').addClass('js-location-is-closed');
      $('.default-repeater__item--menu--hours').addClass('js-repeater-is-open');
      $('.location-topper__status').text('Closed');
    }
  }

  function initLocationIndex() {
    console.log('is index');
    initMap();
    buildLocationsIndex();
  }

  function initLocationSingle() {
    console.log('is single');
    var currentLocation = setCurrentPage(eachLocation);
    initMap(currentLocation.latitude, currentLocation.longitude);
    setMenu(currentLocation);
    setSingleTopperInfo(currentLocation);
  }

  if ($('body').hasClass('page-child')) {
    initLocationSingle();
  } else {
    initLocationIndex();
  }

  $('body').on('click', '.menu-info__trigger', function () {
    $(this).closest('.menu-info__mod').toggleClass('modal-is-active');
  });

  $(document).keyup(function (e) {
    $('.menu-info__mod').removeClass('modal-is-active');
  });
});