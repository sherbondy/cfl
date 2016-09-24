(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

jQuery(document).ready(function ($) {
  var locations = apiResponse;
  var eachLocation = locations.locations;
  var apiURL = 'https://menu.cloverfoodlab.com/api/';
  var themeLoc = '/wp-content/themes/clover-theme';
  var userLocation = new google.maps.LatLng(42.3601, -71.0589);
  var today = moment().format('dddd');
  var now = moment().format('HH:mm:ss');
  var days = { 'Sunday': { 'allHours': [] }, 'Monday': { 'allHours': [] }, 'Tuesday': { 'allHours': [] }, 'Wednesday': { 'allHours': [] }, 'Thursday': { 'allHours': [] }, 'Friday': { 'allHours': [] }, 'Saturday': { 'allHours': [] } };
  var dayArray = Object.keys(days);
  var dayArrayAbbr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var isMobile = $(window).width() < 768;
  var initialLocation = null;

  function initMap(isDraggable, lat, lng) {
    return new Promise(function (resolve, reject) {
      var styles = [{
        "featureType": "water",
        "stylers": [{ "saturation": -100 }, { "gamma": 0.25 }, { "visibility": "simplified" }]
      }, {
        "stylers": [{ "saturation": -100 }]
      }, {
        "stylers": [{ "visibility": "simplified" }, { "gamma": 1.39 }]
      }, {}];

      var map = new google.maps.Map(document.getElementById('map'), {
        draggable: isDraggable,
        zoom: 14,
        scrollwheel: false,
        // center: new google.maps.LatLng(42.3601, -71.0589),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      // map.setOptions({styles: styles});
      if (lat && lng) {
        map.setCenter(new google.maps.LatLng(lat, lng));
        map.setZoom(15);
        console.log('default lat lng');
        resolve(initialLocation);
      } else {
        (function () {
          var handleNoGeolocation = function handleNoGeolocation(errorFlag) {
            if (errorFlag === true) {
              console.log('geoloaction failed');
            } else {
              console.log('no browser support');
            }
            initialLocation = new google.maps.LatLng(42.3601, -71.0589);
            map.setCenter(initialLocation);
            resolve(initialLocation);
          };

          var browserSupportFlag = void 0;

          if (navigator.geolocation) {
            browserSupportFlag = true;
            navigator.geolocation.getCurrentPosition(function (position) {
              initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
              userLocation = initialLocation;
              map.setCenter(initialLocation);
              console.log('navigator.geolocation');
              resolve(initialLocation);
            }, function () {
              handleNoGeolocation(browserSupportFlag);
            });
          }
          // Browser doesn't support Geolocation
          else {
              browserSupportFlag = false;
              handleNoGeolocation(browserSupportFlag);
              console.log('no geolocation');
            }
        })();
      }

      var infowindow = new google.maps.InfoWindow();

      var marker = void 0,
          i = void 0;

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
    });
  }

  function isThisOperating(location) {
    return location.is_operating;
  }

  function isThisOpen(location) {
    return location.is_open;
  }

  function isThisATruck(location) {
    return location.is_truck;
  }

  function returnTime(time) {

    return moment(time, 'HH:mm:ss', false).format('h:mma');

    // let start = moment(time, 'HH:mm:ss', false);
    // let remainder = (60 - start.minute()) % 60;
    // return moment(start).add("minutes", remainder ).format('h:mmA');
  }

  function findTodaysClosing(location) {
    var num = 0;
    var locationSlug = void 0;
    location.meals.forEach(function (meal, i) {
      // num = meal.end_time;
      for (var k in meal.days) {
        if (meal.days[k] === today) {
          num = meal.end_time;
          locationSlug = location.slug;
        }
      }
    });
    // return num;
    return returnTime(num);
  }

  function buildLocationItem(location, i) {
    if (isThisOperating(location)) {
      var locationLatLong = new google.maps.LatLng(location.latitude, location.longitude);
      var distance = google.maps.geometry.spherical.computeDistanceBetween(userLocation, locationLatLong, 3959);

      var address = location.address_street_1 + ' ' + location.address_city + ', ' + location.address_state + ' ' + location.address_zip_code;
      var thisLocationID = 'locations-mod-' + i;
      var distanceDisplay = Math.round(distance * 10) / 10 + 'mi';
      var closingTime = findTodaysClosing(location);
      // let currentStatus = isThisOpen(location) ? `Ope`2n until ${closingTime}` : 'Closed';
      var currentStatus = isThisOpen(location) ? 'Open until ' + closingTime : 'Closed';
      var currentStatusClass = isThisOpen(location) ? 'location-item--open' : 'location-item--closed';
      var twitterUrl = 'https://twitter.com/' + location.twitter;
      var googleUrl = 'http://maps.google.com/?q=' + address;

      var $locationItem = '\n      <li class="location-item location-item--' + location.slug + ' js-has-data ' + currentStatusClass + '" id="' + thisLocationID + '" data-status="' + isThisOpen(location) + '" data-truck="' + isThisATruck(location) + '" data-distance="' + distance + '" data-name="' + location.slug + '">\n        <a class="location-item-inner" href="' + window.location.href.split('/locations')[0] + '/locations/location/?l=' + eachLocation[i].slug + '">\n          <div class="location-tease__img" style="background-image: url(\'' + location.photo_url + '\')"> </div>\n          <div class"location-tease__hgroup">\n            <h3 class="location__title">\n                <span class="location__title__name">' + location.description + '</span>\n                <span class="location__title__distance">' + distanceDisplay + '</span>\n            </h3>\n            <h4 class="location__status">' + currentStatus + '</h4>\n          </div>\n        </a>\n      </li>';
      $('.locations-mod').append($locationItem);
    }
  }

  function buildLocationsIndex() {
    eachLocation.forEach(function (location, i) {
      buildLocationItem(location, i, userLocation);
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
    var hours = void 0;
    if (meal.days[0] !== meal.days[meal.days.length - 1]) {
      hours = meal.days[0] + ' to ' + meal.days[meal.days.length - 1];
    } else {
      hours = '' + meal.days[0];
    }
    var menuItem = '\n      <li class="default-repeater__item default-repeater__item--menu default-repeater__item--menu--' + meal.slug + '">\n        <h4 class="default-repeater__title">' + meal.name + ' Menu\n          <span class="menu-info__hours menu-info__hours--' + meal.slug + '">Served ' + hours + ': ' + returnTime(meal.start_time) + ' - ' + returnTime(meal.end_time) + '</span>\n        </h4>\n        <div class="default-repeater__content-mod">\n          <div class="default-repeater__content default-repeater__content--' + meal.slug + '"></div>\n        </div>\n      </li>';

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
      //
      var categories = data.categories;
      for (var key in categories) {
        var category = categories[key];
        $('.default-repeater__content--' + meal.slug).append('<li class="menu__cat" data-cat="' + key + '-' + i + '"><h6 class="menu__cat-title">' + category.description + '</h6></li>');
      }

      // build items
      var items = data.items;
      for (var _key in items) {
        var item = items[_key];
        var itemCat = item.category;
        var itemName = item.description;
        var isNew = item.is_new ? '<span class="js-is-new">New </span>' : '';
        var soldOutClass = item.availability != 1 ? 'js-is-not-available' : 'js-is-available';
        var price = '<span class="menu-price">$' + item.price + '</span>';
        var itemImg = item.photo_url ? '<img class="menu-img" src="' + item.photo_url + '">' : '';
        var info = item.long_description.length ? '\n          <div class="menu-info__mod">\n            <button class="menu-info__trigger menu-info__trigger--open">?</button>\n            <div class="menu-info__modal">\n              ' + itemImg + '\n              <div class="menu-info__modal--width">\n                <button class="menu-info__trigger menu-info__trigger--close">Close</button>\n                <h2 class="menu-info__modal-title">' + item.description + '</h2>\n                ' + replaceMarkDown(item.long_description) + '\n              </div>\n            </div>\n          </div>' : '';

        $('[data-cat=\'' + itemCat + '-' + i + '\']').append('\n            <div class="menu__item ' + soldOutClass + '">\n              <span class="menu__item-name">' + isNew + ' ' + itemName + ' ' + info + '</span> ' + price + '\n            </div>');
      }
    });
  }

  function setMenuHours(meal) {
    if (meal.days[0] !== meal.days[meal.days.length - 1]) {
      return meal.days[0] + ' to ' + meal.days[meal.days.length - 1];
    } else {
      return '' + meal.days[0];
    }
  }

  function setMenu(currentLocation) {
    var meals = currentLocation.meals;
    var slug = currentLocation.slug;
    var allMeals = [];
    meals.forEach(function (meal, i) {
      if ($.inArray(meal.slug, allMeals) == -1) {
        buildMenuItem(meal, slug);
        buildMenu(meal, slug, i);
        allMeals.push(meal.slug);
      } else {
        var hours = setMenuHours(meal);
        var moreHours = ', ' + hours + ': ' + returnTime(meal.start_time) + ' - ' + returnTime(meal.end_time);
        $('.menu-info__hours--' + meal.slug).append(moreHours);
      }
    });

    $('.default-repeater__item--menu:eq(0)').remove();
  }

  function setSingleTopperInfo(location) {
    var address = location.address_street_1 + ' ' + location.address_city + ', ' + location.address_state + ' ' + location.address_zip_code;
    var longDescription = location.long_description ? '<p class="location-topper__about">' + location.long_description + '</p>' : '';
    $('.location-address').text(address).attr('href', 'http://maps.google.com/?q=' + address);
    $('.location-topper__title').text(location.description);
    $('.location-topper__twitter').text('@' + location.twitter).attr('href', 'https://twitter.com/' + location.twitter);
    $('.location-topper__title').after(longDescription);

    if (isThisOpen(location)) {
      $('body').addClass('js-location-is-open');
      $('.location-topper__status').text('Open');
    } else {
      $('body').addClass('js-location-is-closed');
      $('.location-topper__status').text('Closed');
    }
  }

  function openCurrentMenu(location) {
    // if (isThisOpen(location)) {
    $('.default-repeater__item--menu--hours').addClass('js-repeater-is-open');
    var locationSlug = void 0;
    location.meals.forEach(function (meal, i) {
      for (var k in meal.days) {
        if (meal.days[k] === today && meal.end_time >= now && meal.start_time <= now) {
          $('.default-repeater__item--menu--' + meal.slug).addClass('js-repeater-is-open');
          $('.default-repeater__item--menu--hours').removeClass('js-repeater-is-open');
        }
      }
    });
    // } else {
    // }
  }

  function sortLocationsBy(option) {
    $('.locations-mod').html($('.location-item').sort(function (a, b) {
      if (option === 'distance') {
        return parseInt(a.getAttribute('data-' + option)) < parseInt(b.getAttribute('data-' + option)) ? -1 : parseInt(a.getAttribute('data-' + option)) > parseInt(b.getAttribute('data-' + option)) ? 1 : 0;
      } else {
        return a.getAttribute('data-' + option) < b.getAttribute('data-' + option) ? -1 : a.getAttribute('data-' + option) > b.getAttribute('data-' + option) ? 1 : 0;
      }
    }));
  }

  function filterLocationsBy(option) {
    if (option === 'all') {
      $('.location-item').show();
    } else if (option === 'restaurants') {
      $('.location-item').each(function () {
        var $this = $(this);
        $this.show();
        if ($this.attr('data-truck') !== 'false') {
          $this.hide();
        }
      });
    } else {
      $('.location-item').each(function () {
        var $this = $(this);
        $this.show();
        if ($this.attr('data-' + option) !== 'true') {
          $this.hide();
        }
      });
    }
  }

  function setAllHours(currentLocation) {
    currentLocation.meals.forEach(function (meal, i) {
      for (var k in meal.days) {
        days[meal.days[k]].allHours.push(parseInt(moment(meal.start_time, 'HH:mm:ss', false).format('HHmm')));
        days[meal.days[k]].allHours.push(parseInt(moment(meal.end_time, 'HH:mm:ss', false).format('HHmm')));
      }
    });

    function amOrPm(time) {
      var Time = time.toString();
      if (time === Infinity || time === -Infinity) {
        return 'Closed';
      } else if (time < 1000) {
        return Time.slice(0, 1) + ':' + Time.slice(1) + 'am';
      } else if (time >= 1200) {
        return moment(Time.slice(0, 2) + ':' + Time.slice(2) + 'pm', 'HH:mma', false).format('h:mma');
      } else {
        return Time.slice(0, 2) + ':' + Time.slice(2) + 'am';
      }
    }

    for (var day in days) {
      days[day].min = amOrPm(Math.min.apply(null, days[day].allHours));
      days[day].max = amOrPm(Math.max.apply(null, days[day].allHours));
    }
  }

  function elminateRepeats(first, second) {
    if (first === second) {
      return first;
    } else {
      return first + ' – ' + second;
    }
  }

  function setHours(days) {
    var openingTime = 0;
    var closingTime = 0;
    var prevIndex = 0;
    var index = 0;
    var dailyHours = [];
    var startDate = null;
    for (var day in days) {

      index = Object.keys(days).indexOf(day);

      startDate = day;
      if (days[day].min !== openingTime || days[day].max !== closingTime) {
        if (index === prevIndex) {
          dailyHours.push('<li><b>' + dayArrayAbbr[index] + ':</b> <span>' + elminateRepeats(days[day].min, days[day].max) + '</span></li>');
          prevIndex = Object.keys(days).indexOf(day);
        } else if (index > 1) {
          dailyHours.push('<li><b>' + dayArrayAbbr[prevIndex] + ' – ' + dayArrayAbbr[index - 1] + ':</b> <span>' + elminateRepeats(days[dayArray[prevIndex]].min, days[dayArray[prevIndex]].max) + '</span></li>');
          prevIndex = Object.keys(days).indexOf(day);
        } else {
          prevIndex = Object.keys(days).indexOf(day);
        }
        openingTime = days[day].min;
        closingTime = days[day].max;
      }

      if (index === 6) {
        if (prevIndex === 0 && days[day].min === openingTime && days[day].max === closingTime) {
          // same as all days since sunday
          dailyHours = ['<li><b>Everyday:</b> <span>' + elminateRepeats(days[day].min, days[day].max) + '</span></li>'];
        } else if (prevIndex !== 0 && days[day].min === openingTime && days[day].max === closingTime) {
          // same as previous days
          dailyHours.push('<li><b>' + elminateRepeats(dayArrayAbbr[prevIndex], dayArrayAbbr[index]) + ':</b> <span>' + elminateRepeats(days[dayArray[prevIndex]].min, days[dayArray[prevIndex]].max) + '</span></li>');
        } else if (prevIndex !== 0 && days[day].min !== openingTime || days[day].max !== closingTime) {
          // different from previous span of days
          dailyHours.push('<li><b>' + elminateRepeats(dayArrayAbbr[prevIndex], dayArrayAbbr[index - 1]) + ':</b> <span>' + elminateRepeats(days[dayArray[prevIndex]].min, days[dayArray[prevIndex]].max) + '</span></li>');
          dailyHours.push('<li><b>' + dayArrayAbbr[index] + ':</b> <span>' + elminateRepeats(days[day].min, days[day].max) + '</span></li>');
        } else {
          dailyHours.push('<li><b>' + dayArrayAbbr[index] + ':</b> <span>' + elminateRepeats(days[day].min, days[day].max) + '</span></li>');
        }
      }
    }
    // replace sat && sun with weekend
    if (dailyHours[dailyHours.length] > 0 && dailyHours[dailyHours.length - 1].slice(10) === dailyHours[0].slice(10)) {
      dailyHours[0] = '<li><b>Weekends ' + dailyHours[0].slice(10);
      dailyHours[dailyHours.length - 1] = '';
    }

    if (dailyHours[1] && dailyHours[1].slice(0, 16) === "<li><b>Mon – Fri") {
      dailyHours[1] = '<li><b>Weekdays' + dailyHours[1].slice(16);
    }

    if (dailyHours[0] === "<li><b>Everyday:</b> <span>0:am – 11:59pm</span></li>") {
      dailyHours[0] = "<li><b>Everyday:</b> <span>24 Hours</span></li>";
    }

    dailyHours.forEach(function (hours) {
      $('.hours__list').append(hours);
    });
  };

  $(window).resize(function () {
    isMobile = $(window).width() < 768;
    console.log(isMobile);
  });

  function resetMap(lat, long) {
    if (isMobile) {
      $(".map-container").click(function () {
        if (!$('body').hasClass('map-is-fullscreen')) {
          $("body").addClass("map-is-fullscreen");
          initMap(true, lat, long);
        }
      });
      $(".map-close").click(function () {
        $("body").removeClass("map-is-fullscreen");
        initMap(false, lat, long);
      });
    }
  }

  function initLocationIndex() {
    console.log('is index');

    initMap(!isMobile).then(function (userLocation) {
      console.log('printing ' + userLocation);
      buildLocationsIndex();
      sortLocationsBy('distance');
      $('.location-item--temp, .location-item--clovertrk3').remove();
      resetMap();
    });
  }

  function initLocationSingle() {
    console.log('is single');
    var currentLocation = setCurrentPage(eachLocation);
    initMap(!isMobile, currentLocation.latitude, currentLocation.longitude);
    setAllHours(currentLocation);
    setHours(days);
    setMenu(currentLocation);
    setSingleTopperInfo(currentLocation);
    openCurrentMenu(currentLocation);
    resetMap(currentLocation.latitude, currentLocation.longitude);
  }

  if ($('body').hasClass('page-child')) {
    initLocationSingle();
  } else {
    initLocationIndex();
  }

  $('body').on('click', '.menu-info__trigger', function () {
    $(this).closest('.menu-info__mod').toggleClass('modal-is-active');
    $('.nav').toggleClass('nav-hidden');
  });

  $(document).keyup(function (e) {
    $('.menu-info__mod').removeClass('modal-is-active');
    $('.nav').removeClass('nav-hidden');
  });

  $('#sort').on('change', function () {
    var sortBy = $(this).find(':selected').val();
    sortLocationsBy(sortBy);
  });

  $('#filter').on('change', function () {
    var filterBy = $(this).find(':selected').val();
    filterLocationsBy(filterBy);
  });
});

},{}]},{},[1]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjbG92ZXItYXBpLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pKHsxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxualF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoJCkge1xuICB2YXIgbG9jYXRpb25zID0gYXBpUmVzcG9uc2U7XG4gIHZhciBlYWNoTG9jYXRpb24gPSBsb2NhdGlvbnMubG9jYXRpb25zO1xuICB2YXIgYXBpVVJMID0gJ2h0dHBzOi8vbWVudS5jbG92ZXJmb29kbGFiLmNvbS9hcGkvJztcbiAgdmFyIHRoZW1lTG9jID0gJy93cC1jb250ZW50L3RoZW1lcy9jbG92ZXItdGhlbWUnO1xuICB2YXIgdXNlckxvY2F0aW9uID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyg0Mi4zNjAxLCAtNzEuMDU4OSk7XG4gIHZhciB0b2RheSA9IG1vbWVudCgpLmZvcm1hdCgnZGRkZCcpO1xuICB2YXIgbm93ID0gbW9tZW50KCkuZm9ybWF0KCdISDptbTpzcycpO1xuICB2YXIgZGF5cyA9IHsgJ1N1bmRheSc6IHsgJ2FsbEhvdXJzJzogW10gfSwgJ01vbmRheSc6IHsgJ2FsbEhvdXJzJzogW10gfSwgJ1R1ZXNkYXknOiB7ICdhbGxIb3Vycyc6IFtdIH0sICdXZWRuZXNkYXknOiB7ICdhbGxIb3Vycyc6IFtdIH0sICdUaHVyc2RheSc6IHsgJ2FsbEhvdXJzJzogW10gfSwgJ0ZyaWRheSc6IHsgJ2FsbEhvdXJzJzogW10gfSwgJ1NhdHVyZGF5JzogeyAnYWxsSG91cnMnOiBbXSB9IH07XG4gIHZhciBkYXlBcnJheSA9IE9iamVjdC5rZXlzKGRheXMpO1xuICB2YXIgZGF5QXJyYXlBYmJyID0gW1wiU3VuXCIsIFwiTW9uXCIsIFwiVHVlXCIsIFwiV2VkXCIsIFwiVGh1XCIsIFwiRnJpXCIsIFwiU2F0XCJdO1xuICB2YXIgaXNNb2JpbGUgPSAkKHdpbmRvdykud2lkdGgoKSA8IDc2ODtcbiAgdmFyIGluaXRpYWxMb2NhdGlvbiA9IG51bGw7XG5cbiAgZnVuY3Rpb24gaW5pdE1hcChpc0RyYWdnYWJsZSwgbGF0LCBsbmcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHN0eWxlcyA9IFt7XG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ3YXRlclwiLFxuICAgICAgICBcInN0eWxlcnNcIjogW3sgXCJzYXR1cmF0aW9uXCI6IC0xMDAgfSwgeyBcImdhbW1hXCI6IDAuMjUgfSwgeyBcInZpc2liaWxpdHlcIjogXCJzaW1wbGlmaWVkXCIgfV1cbiAgICAgIH0sIHtcbiAgICAgICAgXCJzdHlsZXJzXCI6IFt7IFwic2F0dXJhdGlvblwiOiAtMTAwIH1dXG4gICAgICB9LCB7XG4gICAgICAgIFwic3R5bGVyc1wiOiBbeyBcInZpc2liaWxpdHlcIjogXCJzaW1wbGlmaWVkXCIgfSwgeyBcImdhbW1hXCI6IDEuMzkgfV1cbiAgICAgIH0sIHt9XTtcblxuICAgICAgdmFyIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpLCB7XG4gICAgICAgIGRyYWdnYWJsZTogaXNEcmFnZ2FibGUsXG4gICAgICAgIHpvb206IDE0LFxuICAgICAgICBzY3JvbGx3aGVlbDogZmFsc2UsXG4gICAgICAgIC8vIGNlbnRlcjogbmV3IGdvb2dsZS5tYXBzLkxhdExuZyg0Mi4zNjAxLCAtNzEuMDU4OSksXG4gICAgICAgIG1hcFR5cGVJZDogZ29vZ2xlLm1hcHMuTWFwVHlwZUlkLlJPQURNQVBcbiAgICAgIH0pO1xuXG4gICAgICAvLyBtYXAuc2V0T3B0aW9ucyh7c3R5bGVzOiBzdHlsZXN9KTtcbiAgICAgIGlmIChsYXQgJiYgbG5nKSB7XG4gICAgICAgIG1hcC5zZXRDZW50ZXIobmV3IGdvb2dsZS5tYXBzLkxhdExuZyhsYXQsIGxuZykpO1xuICAgICAgICBtYXAuc2V0Wm9vbSgxNSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdkZWZhdWx0IGxhdCBsbmcnKTtcbiAgICAgICAgcmVzb2x2ZShpbml0aWFsTG9jYXRpb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgaGFuZGxlTm9HZW9sb2NhdGlvbiA9IGZ1bmN0aW9uIGhhbmRsZU5vR2VvbG9jYXRpb24oZXJyb3JGbGFnKSB7XG4gICAgICAgICAgICBpZiAoZXJyb3JGbGFnID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdnZW9sb2FjdGlvbiBmYWlsZWQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdubyBicm93c2VyIHN1cHBvcnQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluaXRpYWxMb2NhdGlvbiA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoNDIuMzYwMSwgLTcxLjA1ODkpO1xuICAgICAgICAgICAgbWFwLnNldENlbnRlcihpbml0aWFsTG9jYXRpb24pO1xuICAgICAgICAgICAgcmVzb2x2ZShpbml0aWFsTG9jYXRpb24pO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICB2YXIgYnJvd3NlclN1cHBvcnRGbGFnID0gdm9pZCAwO1xuXG4gICAgICAgICAgaWYgKG5hdmlnYXRvci5nZW9sb2NhdGlvbikge1xuICAgICAgICAgICAgYnJvd3NlclN1cHBvcnRGbGFnID0gdHJ1ZTtcbiAgICAgICAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oZnVuY3Rpb24gKHBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgIGluaXRpYWxMb2NhdGlvbiA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcocG9zaXRpb24uY29vcmRzLmxhdGl0dWRlLCBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlKTtcbiAgICAgICAgICAgICAgdXNlckxvY2F0aW9uID0gaW5pdGlhbExvY2F0aW9uO1xuICAgICAgICAgICAgICBtYXAuc2V0Q2VudGVyKGluaXRpYWxMb2NhdGlvbik7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCduYXZpZ2F0b3IuZ2VvbG9jYXRpb24nKTtcbiAgICAgICAgICAgICAgcmVzb2x2ZShpbml0aWFsTG9jYXRpb24pO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBoYW5kbGVOb0dlb2xvY2F0aW9uKGJyb3dzZXJTdXBwb3J0RmxhZyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gQnJvd3NlciBkb2Vzbid0IHN1cHBvcnQgR2VvbG9jYXRpb25cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgYnJvd3NlclN1cHBvcnRGbGFnID0gZmFsc2U7XG4gICAgICAgICAgICAgIGhhbmRsZU5vR2VvbG9jYXRpb24oYnJvd3NlclN1cHBvcnRGbGFnKTtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ25vIGdlb2xvY2F0aW9uJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKCk7XG4gICAgICB9XG5cbiAgICAgIHZhciBpbmZvd2luZG93ID0gbmV3IGdvb2dsZS5tYXBzLkluZm9XaW5kb3coKTtcblxuICAgICAgdmFyIG1hcmtlciA9IHZvaWQgMCxcbiAgICAgICAgICBpID0gdm9pZCAwO1xuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgZWFjaExvY2F0aW9uLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBsb2NhdGlvblN0YXR1cyA9IGlzVGhpc09wZW4oZWFjaExvY2F0aW9uW2ldKSA/ICdvcGVuJyA6ICdjbG9zZWQnO1xuICAgICAgICB2YXIgbG9jYXRpb25UeXBlID0gaXNUaGlzQVRydWNrKGVhY2hMb2NhdGlvbltpXSkgPyAndHJ1Y2snIDogJ3N0b3JlJztcblxuICAgICAgICBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcbiAgICAgICAgICBwb3NpdGlvbjogbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhlYWNoTG9jYXRpb25baV0ubGF0aXR1ZGUsIGVhY2hMb2NhdGlvbltpXS5sb25naXR1ZGUpLFxuICAgICAgICAgIG1hcDogbWFwLFxuICAgICAgICAgIGljb246IHRoZW1lTG9jICsgJy9zdGF0aWMvaW1nL2ljb24tLScgKyAoaXNUaGlzQVRydWNrKGVhY2hMb2NhdGlvbltpXSkgPyAndHJ1Y2snIDogJ3N0b3JlJykgKyAnLScgKyAoaXNUaGlzT3BlbihlYWNoTG9jYXRpb25baV0pID8gJ29wZW4nIDogJ2Nsb3NlZCcpICsgJy5zdmcnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcmtlciwgJ21vdXNlb3ZlcicsIGZ1bmN0aW9uIChtYXJrZXIsIGkpIHtcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaW5mb3dpbmRvdy5zZXRDb250ZW50KGVhY2hMb2NhdGlvbltpXS5kZXNjcmlwdGlvbik7XG4gICAgICAgICAgICBpbmZvd2luZG93Lm9wZW4obWFwLCBtYXJrZXIpO1xuICAgICAgICAgIH07XG4gICAgICAgIH0obWFya2VyLCBpKSk7XG5cbiAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFya2VyLCAnbW91c2VvdXQnLCBmdW5jdGlvbiAobWFya2VyLCBpKSB7XG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGluZm93aW5kb3cuY2xvc2UoKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9KG1hcmtlciwgaSkpO1xuXG4gICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcmtlciwgJ2NsaWNrJywgZnVuY3Rpb24gKG1hcmtlciwgaSkge1xuICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZSgnL2xvY2F0aW9ucy9sb2NhdGlvbi8/bD0nICsgZWFjaExvY2F0aW9uW2ldLnNsdWcpO1xuICAgICAgICAgIH07XG4gICAgICAgIH0obWFya2VyLCBpKSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBpc1RoaXNPcGVyYXRpbmcobG9jYXRpb24pIHtcbiAgICByZXR1cm4gbG9jYXRpb24uaXNfb3BlcmF0aW5nO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNUaGlzT3Blbihsb2NhdGlvbikge1xuICAgIHJldHVybiBsb2NhdGlvbi5pc19vcGVuO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNUaGlzQVRydWNrKGxvY2F0aW9uKSB7XG4gICAgcmV0dXJuIGxvY2F0aW9uLmlzX3RydWNrO1xuICB9XG5cbiAgZnVuY3Rpb24gcmV0dXJuVGltZSh0aW1lKSB7XG5cbiAgICByZXR1cm4gbW9tZW50KHRpbWUsICdISDptbTpzcycsIGZhbHNlKS5mb3JtYXQoJ2g6bW1hJyk7XG5cbiAgICAvLyBsZXQgc3RhcnQgPSBtb21lbnQodGltZSwgJ0hIOm1tOnNzJywgZmFsc2UpO1xuICAgIC8vIGxldCByZW1haW5kZXIgPSAoNjAgLSBzdGFydC5taW51dGUoKSkgJSA2MDtcbiAgICAvLyByZXR1cm4gbW9tZW50KHN0YXJ0KS5hZGQoXCJtaW51dGVzXCIsIHJlbWFpbmRlciApLmZvcm1hdCgnaDptbUEnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbmRUb2RheXNDbG9zaW5nKGxvY2F0aW9uKSB7XG4gICAgdmFyIG51bSA9IDA7XG4gICAgdmFyIGxvY2F0aW9uU2x1ZyA9IHZvaWQgMDtcbiAgICBsb2NhdGlvbi5tZWFscy5mb3JFYWNoKGZ1bmN0aW9uIChtZWFsLCBpKSB7XG4gICAgICAvLyBudW0gPSBtZWFsLmVuZF90aW1lO1xuICAgICAgZm9yICh2YXIgayBpbiBtZWFsLmRheXMpIHtcbiAgICAgICAgaWYgKG1lYWwuZGF5c1trXSA9PT0gdG9kYXkpIHtcbiAgICAgICAgICBudW0gPSBtZWFsLmVuZF90aW1lO1xuICAgICAgICAgIGxvY2F0aW9uU2x1ZyA9IGxvY2F0aW9uLnNsdWc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICAvLyByZXR1cm4gbnVtO1xuICAgIHJldHVybiByZXR1cm5UaW1lKG51bSk7XG4gIH1cblxuICBmdW5jdGlvbiBidWlsZExvY2F0aW9uSXRlbShsb2NhdGlvbiwgaSkge1xuICAgIGlmIChpc1RoaXNPcGVyYXRpbmcobG9jYXRpb24pKSB7XG4gICAgICB2YXIgbG9jYXRpb25MYXRMb25nID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhsb2NhdGlvbi5sYXRpdHVkZSwgbG9jYXRpb24ubG9uZ2l0dWRlKTtcbiAgICAgIHZhciBkaXN0YW5jZSA9IGdvb2dsZS5tYXBzLmdlb21ldHJ5LnNwaGVyaWNhbC5jb21wdXRlRGlzdGFuY2VCZXR3ZWVuKHVzZXJMb2NhdGlvbiwgbG9jYXRpb25MYXRMb25nLCAzOTU5KTtcblxuICAgICAgdmFyIGFkZHJlc3MgPSBsb2NhdGlvbi5hZGRyZXNzX3N0cmVldF8xICsgJyAnICsgbG9jYXRpb24uYWRkcmVzc19jaXR5ICsgJywgJyArIGxvY2F0aW9uLmFkZHJlc3Nfc3RhdGUgKyAnICcgKyBsb2NhdGlvbi5hZGRyZXNzX3ppcF9jb2RlO1xuICAgICAgdmFyIHRoaXNMb2NhdGlvbklEID0gJ2xvY2F0aW9ucy1tb2QtJyArIGk7XG4gICAgICB2YXIgZGlzdGFuY2VEaXNwbGF5ID0gTWF0aC5yb3VuZChkaXN0YW5jZSAqIDEwKSAvIDEwICsgJ21pJztcbiAgICAgIHZhciBjbG9zaW5nVGltZSA9IGZpbmRUb2RheXNDbG9zaW5nKGxvY2F0aW9uKTtcbiAgICAgIC8vIGxldCBjdXJyZW50U3RhdHVzID0gaXNUaGlzT3Blbihsb2NhdGlvbikgPyBgT3BlYDJuIHVudGlsICR7Y2xvc2luZ1RpbWV9YCA6ICdDbG9zZWQnO1xuICAgICAgdmFyIGN1cnJlbnRTdGF0dXMgPSBpc1RoaXNPcGVuKGxvY2F0aW9uKSA/ICdPcGVuIHVudGlsICcgKyBjbG9zaW5nVGltZSA6ICdDbG9zZWQnO1xuICAgICAgdmFyIGN1cnJlbnRTdGF0dXNDbGFzcyA9IGlzVGhpc09wZW4obG9jYXRpb24pID8gJ2xvY2F0aW9uLWl0ZW0tLW9wZW4nIDogJ2xvY2F0aW9uLWl0ZW0tLWNsb3NlZCc7XG4gICAgICB2YXIgdHdpdHRlclVybCA9ICdodHRwczovL3R3aXR0ZXIuY29tLycgKyBsb2NhdGlvbi50d2l0dGVyO1xuICAgICAgdmFyIGdvb2dsZVVybCA9ICdodHRwOi8vbWFwcy5nb29nbGUuY29tLz9xPScgKyBhZGRyZXNzO1xuXG4gICAgICB2YXIgJGxvY2F0aW9uSXRlbSA9ICdcXG4gICAgICA8bGkgY2xhc3M9XCJsb2NhdGlvbi1pdGVtIGxvY2F0aW9uLWl0ZW0tLScgKyBsb2NhdGlvbi5zbHVnICsgJyBqcy1oYXMtZGF0YSAnICsgY3VycmVudFN0YXR1c0NsYXNzICsgJ1wiIGlkPVwiJyArIHRoaXNMb2NhdGlvbklEICsgJ1wiIGRhdGEtc3RhdHVzPVwiJyArIGlzVGhpc09wZW4obG9jYXRpb24pICsgJ1wiIGRhdGEtdHJ1Y2s9XCInICsgaXNUaGlzQVRydWNrKGxvY2F0aW9uKSArICdcIiBkYXRhLWRpc3RhbmNlPVwiJyArIGRpc3RhbmNlICsgJ1wiIGRhdGEtbmFtZT1cIicgKyBsb2NhdGlvbi5zbHVnICsgJ1wiPlxcbiAgICAgICAgPGEgY2xhc3M9XCJsb2NhdGlvbi1pdGVtLWlubmVyXCIgaHJlZj1cIicgKyB3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdCgnL2xvY2F0aW9ucycpWzBdICsgJy9sb2NhdGlvbnMvbG9jYXRpb24vP2w9JyArIGVhY2hMb2NhdGlvbltpXS5zbHVnICsgJ1wiPlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibG9jYXRpb24tdGVhc2VfX2ltZ1wiIHN0eWxlPVwiYmFja2dyb3VuZC1pbWFnZTogdXJsKFxcJycgKyBsb2NhdGlvbi5waG90b191cmwgKyAnXFwnKVwiPiA8L2Rpdj5cXG4gICAgICAgICAgPGRpdiBjbGFzc1wibG9jYXRpb24tdGVhc2VfX2hncm91cFwiPlxcbiAgICAgICAgICAgIDxoMyBjbGFzcz1cImxvY2F0aW9uX190aXRsZVwiPlxcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImxvY2F0aW9uX190aXRsZV9fbmFtZVwiPicgKyBsb2NhdGlvbi5kZXNjcmlwdGlvbiArICc8L3NwYW4+XFxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibG9jYXRpb25fX3RpdGxlX19kaXN0YW5jZVwiPicgKyBkaXN0YW5jZURpc3BsYXkgKyAnPC9zcGFuPlxcbiAgICAgICAgICAgIDwvaDM+XFxuICAgICAgICAgICAgPGg0IGNsYXNzPVwibG9jYXRpb25fX3N0YXR1c1wiPicgKyBjdXJyZW50U3RhdHVzICsgJzwvaDQ+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgPC9hPlxcbiAgICAgIDwvbGk+JztcbiAgICAgICQoJy5sb2NhdGlvbnMtbW9kJykuYXBwZW5kKCRsb2NhdGlvbkl0ZW0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGJ1aWxkTG9jYXRpb25zSW5kZXgoKSB7XG4gICAgZWFjaExvY2F0aW9uLmZvckVhY2goZnVuY3Rpb24gKGxvY2F0aW9uLCBpKSB7XG4gICAgICBidWlsZExvY2F0aW9uSXRlbShsb2NhdGlvbiwgaSwgdXNlckxvY2F0aW9uKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlVVJMKG5hbWUsIHVybCkge1xuICAgIGlmICghdXJsKSB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICBuYW1lID0gbmFtZS5yZXBsYWNlKC9bXFxbXFxdXS9nLCBcIlxcXFwkJlwiKTtcbiAgICB2YXIgcmVnZXggPSBuZXcgUmVnRXhwKFwiWz8mXVwiICsgbmFtZSArIFwiKD0oW14mI10qKXwmfCN8JClcIiksXG4gICAgICAgIHJlc3VsdHMgPSByZWdleC5leGVjKHVybCk7XG4gICAgaWYgKCFyZXN1bHRzKSByZXR1cm4gbnVsbDtcbiAgICBpZiAoIXJlc3VsdHNbMl0pIHJldHVybiAnJztcbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHJlc3VsdHNbMl0ucmVwbGFjZSgvXFwrL2csIFwiIFwiKSk7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRDdXJyZW50UGFnZShsb2NhdGlvbikge1xuICAgIHZhciBleHBlY3RlZExvYyA9IHBhcnNlVVJMKCdsJyk7XG4gICAgdmFyIHRoaXNMb2NhdGlvbiA9IHZvaWQgMDtcblxuICAgIGxvY2F0aW9uLmZvckVhY2goZnVuY3Rpb24gKGxvYywgaSkge1xuICAgICAgaWYgKGxvYy5zbHVnID09PSBleHBlY3RlZExvYykge1xuICAgICAgICB0aGlzTG9jYXRpb24gPSBsb2M7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpc0xvY2F0aW9uO1xuICB9XG5cbiAgZnVuY3Rpb24gYnVpbGRNZW51SXRlbShtZWFsLCBzbHVnKSB7XG4gICAgdmFyIGhvdXJzID0gdm9pZCAwO1xuICAgIGlmIChtZWFsLmRheXNbMF0gIT09IG1lYWwuZGF5c1ttZWFsLmRheXMubGVuZ3RoIC0gMV0pIHtcbiAgICAgIGhvdXJzID0gbWVhbC5kYXlzWzBdICsgJyB0byAnICsgbWVhbC5kYXlzW21lYWwuZGF5cy5sZW5ndGggLSAxXTtcbiAgICB9IGVsc2Uge1xuICAgICAgaG91cnMgPSAnJyArIG1lYWwuZGF5c1swXTtcbiAgICB9XG4gICAgdmFyIG1lbnVJdGVtID0gJ1xcbiAgICAgIDxsaSBjbGFzcz1cImRlZmF1bHQtcmVwZWF0ZXJfX2l0ZW0gZGVmYXVsdC1yZXBlYXRlcl9faXRlbS0tbWVudSBkZWZhdWx0LXJlcGVhdGVyX19pdGVtLS1tZW51LS0nICsgbWVhbC5zbHVnICsgJ1wiPlxcbiAgICAgICAgPGg0IGNsYXNzPVwiZGVmYXVsdC1yZXBlYXRlcl9fdGl0bGVcIj4nICsgbWVhbC5uYW1lICsgJyBNZW51XFxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWVudS1pbmZvX19ob3VycyBtZW51LWluZm9fX2hvdXJzLS0nICsgbWVhbC5zbHVnICsgJ1wiPlNlcnZlZCAnICsgaG91cnMgKyAnOiAnICsgcmV0dXJuVGltZShtZWFsLnN0YXJ0X3RpbWUpICsgJyAtICcgKyByZXR1cm5UaW1lKG1lYWwuZW5kX3RpbWUpICsgJzwvc3Bhbj5cXG4gICAgICAgIDwvaDQ+XFxuICAgICAgICA8ZGl2IGNsYXNzPVwiZGVmYXVsdC1yZXBlYXRlcl9fY29udGVudC1tb2RcIj5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImRlZmF1bHQtcmVwZWF0ZXJfX2NvbnRlbnQgZGVmYXVsdC1yZXBlYXRlcl9fY29udGVudC0tJyArIG1lYWwuc2x1ZyArICdcIj48L2Rpdj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvbGk+JztcblxuICAgICQoJy5kZWZhdWx0LXJlcGVhdGVyX19pdGVtLS1tZW51JykubGFzdCgpLmFmdGVyKG1lbnVJdGVtKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlcGxhY2VNYXJrRG93bih2YWwpIHtcbiAgICB2YWwgPSB2YWwucmVwbGFjZSgvXFwqXFwqLitcXCpcXCovZywgZnVuY3Rpb24gKG1hdGNoLCBkZWMpIHtcbiAgICAgIHJldHVybiAnPGIgY2xhc3M9XCJtb3JlLWluZm9fX3RpdGxlXCI+JyArIG1hdGNoICsgJzwvYj4nO1xuICAgIH0pO1xuICAgIHJldHVybiB2YWwucmVwbGFjZSgvXFwqXFwqL2dpLCBcIlwiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGJ1aWxkTWVudShtZWFsLCBzbHVnLCBpKSB7XG5cbiAgICB2YXIgbWVudUFwaUNhbGwgPSAkLmdldEpTT04oYXBpVVJMICsgJ2xvY2F0aW9uLycgKyBzbHVnICsgJy9tZWFsLycgKyBtZWFsLnNsdWcpO1xuICAgIG1lbnVBcGlDYWxsLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIC8vIGJ1aWxkIGNhdGVnb3JpZXNcbiAgICAgIC8vXG4gICAgICB2YXIgY2F0ZWdvcmllcyA9IGRhdGEuY2F0ZWdvcmllcztcbiAgICAgIGZvciAodmFyIGtleSBpbiBjYXRlZ29yaWVzKSB7XG4gICAgICAgIHZhciBjYXRlZ29yeSA9IGNhdGVnb3JpZXNba2V5XTtcbiAgICAgICAgJCgnLmRlZmF1bHQtcmVwZWF0ZXJfX2NvbnRlbnQtLScgKyBtZWFsLnNsdWcpLmFwcGVuZCgnPGxpIGNsYXNzPVwibWVudV9fY2F0XCIgZGF0YS1jYXQ9XCInICsga2V5ICsgJy0nICsgaSArICdcIj48aDYgY2xhc3M9XCJtZW51X19jYXQtdGl0bGVcIj4nICsgY2F0ZWdvcnkuZGVzY3JpcHRpb24gKyAnPC9oNj48L2xpPicpO1xuICAgICAgfVxuXG4gICAgICAvLyBidWlsZCBpdGVtc1xuICAgICAgdmFyIGl0ZW1zID0gZGF0YS5pdGVtcztcbiAgICAgIGZvciAodmFyIF9rZXkgaW4gaXRlbXMpIHtcbiAgICAgICAgdmFyIGl0ZW0gPSBpdGVtc1tfa2V5XTtcbiAgICAgICAgdmFyIGl0ZW1DYXQgPSBpdGVtLmNhdGVnb3J5O1xuICAgICAgICB2YXIgaXRlbU5hbWUgPSBpdGVtLmRlc2NyaXB0aW9uO1xuICAgICAgICB2YXIgaXNOZXcgPSBpdGVtLmlzX25ldyA/ICc8c3BhbiBjbGFzcz1cImpzLWlzLW5ld1wiPk5ldyA8L3NwYW4+JyA6ICcnO1xuICAgICAgICB2YXIgc29sZE91dENsYXNzID0gaXRlbS5hdmFpbGFiaWxpdHkgIT0gMSA/ICdqcy1pcy1ub3QtYXZhaWxhYmxlJyA6ICdqcy1pcy1hdmFpbGFibGUnO1xuICAgICAgICB2YXIgcHJpY2UgPSAnPHNwYW4gY2xhc3M9XCJtZW51LXByaWNlXCI+JCcgKyBpdGVtLnByaWNlICsgJzwvc3Bhbj4nO1xuICAgICAgICB2YXIgaXRlbUltZyA9IGl0ZW0ucGhvdG9fdXJsID8gJzxpbWcgY2xhc3M9XCJtZW51LWltZ1wiIHNyYz1cIicgKyBpdGVtLnBob3RvX3VybCArICdcIj4nIDogJyc7XG4gICAgICAgIHZhciBpbmZvID0gaXRlbS5sb25nX2Rlc2NyaXB0aW9uLmxlbmd0aCA/ICdcXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm1lbnUtaW5mb19fbW9kXCI+XFxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cIm1lbnUtaW5mb19fdHJpZ2dlciBtZW51LWluZm9fX3RyaWdnZXItLW9wZW5cIj4/PC9idXR0b24+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1lbnUtaW5mb19fbW9kYWxcIj5cXG4gICAgICAgICAgICAgICcgKyBpdGVtSW1nICsgJ1xcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1lbnUtaW5mb19fbW9kYWwtLXdpZHRoXCI+XFxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJtZW51LWluZm9fX3RyaWdnZXIgbWVudS1pbmZvX190cmlnZ2VyLS1jbG9zZVwiPkNsb3NlPC9idXR0b24+XFxuICAgICAgICAgICAgICAgIDxoMiBjbGFzcz1cIm1lbnUtaW5mb19fbW9kYWwtdGl0bGVcIj4nICsgaXRlbS5kZXNjcmlwdGlvbiArICc8L2gyPlxcbiAgICAgICAgICAgICAgICAnICsgcmVwbGFjZU1hcmtEb3duKGl0ZW0ubG9uZ19kZXNjcmlwdGlvbikgKyAnXFxuICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgPC9kaXY+JyA6ICcnO1xuXG4gICAgICAgICQoJ1tkYXRhLWNhdD1cXCcnICsgaXRlbUNhdCArICctJyArIGkgKyAnXFwnXScpLmFwcGVuZCgnXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1lbnVfX2l0ZW0gJyArIHNvbGRPdXRDbGFzcyArICdcIj5cXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWVudV9faXRlbS1uYW1lXCI+JyArIGlzTmV3ICsgJyAnICsgaXRlbU5hbWUgKyAnICcgKyBpbmZvICsgJzwvc3Bhbj4gJyArIHByaWNlICsgJ1xcbiAgICAgICAgICAgIDwvZGl2PicpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0TWVudUhvdXJzKG1lYWwpIHtcbiAgICBpZiAobWVhbC5kYXlzWzBdICE9PSBtZWFsLmRheXNbbWVhbC5kYXlzLmxlbmd0aCAtIDFdKSB7XG4gICAgICByZXR1cm4gbWVhbC5kYXlzWzBdICsgJyB0byAnICsgbWVhbC5kYXlzW21lYWwuZGF5cy5sZW5ndGggLSAxXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcnICsgbWVhbC5kYXlzWzBdO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNldE1lbnUoY3VycmVudExvY2F0aW9uKSB7XG4gICAgdmFyIG1lYWxzID0gY3VycmVudExvY2F0aW9uLm1lYWxzO1xuICAgIHZhciBzbHVnID0gY3VycmVudExvY2F0aW9uLnNsdWc7XG4gICAgdmFyIGFsbE1lYWxzID0gW107XG4gICAgbWVhbHMuZm9yRWFjaChmdW5jdGlvbiAobWVhbCwgaSkge1xuICAgICAgaWYgKCQuaW5BcnJheShtZWFsLnNsdWcsIGFsbE1lYWxzKSA9PSAtMSkge1xuICAgICAgICBidWlsZE1lbnVJdGVtKG1lYWwsIHNsdWcpO1xuICAgICAgICBidWlsZE1lbnUobWVhbCwgc2x1ZywgaSk7XG4gICAgICAgIGFsbE1lYWxzLnB1c2gobWVhbC5zbHVnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBob3VycyA9IHNldE1lbnVIb3VycyhtZWFsKTtcbiAgICAgICAgdmFyIG1vcmVIb3VycyA9ICcsICcgKyBob3VycyArICc6ICcgKyByZXR1cm5UaW1lKG1lYWwuc3RhcnRfdGltZSkgKyAnIC0gJyArIHJldHVyblRpbWUobWVhbC5lbmRfdGltZSk7XG4gICAgICAgICQoJy5tZW51LWluZm9fX2hvdXJzLS0nICsgbWVhbC5zbHVnKS5hcHBlbmQobW9yZUhvdXJzKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgICQoJy5kZWZhdWx0LXJlcGVhdGVyX19pdGVtLS1tZW51OmVxKDApJykucmVtb3ZlKCk7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRTaW5nbGVUb3BwZXJJbmZvKGxvY2F0aW9uKSB7XG4gICAgdmFyIGFkZHJlc3MgPSBsb2NhdGlvbi5hZGRyZXNzX3N0cmVldF8xICsgJyAnICsgbG9jYXRpb24uYWRkcmVzc19jaXR5ICsgJywgJyArIGxvY2F0aW9uLmFkZHJlc3Nfc3RhdGUgKyAnICcgKyBsb2NhdGlvbi5hZGRyZXNzX3ppcF9jb2RlO1xuICAgIHZhciBsb25nRGVzY3JpcHRpb24gPSBsb2NhdGlvbi5sb25nX2Rlc2NyaXB0aW9uID8gJzxwIGNsYXNzPVwibG9jYXRpb24tdG9wcGVyX19hYm91dFwiPicgKyBsb2NhdGlvbi5sb25nX2Rlc2NyaXB0aW9uICsgJzwvcD4nIDogJyc7XG4gICAgJCgnLmxvY2F0aW9uLWFkZHJlc3MnKS50ZXh0KGFkZHJlc3MpLmF0dHIoJ2hyZWYnLCAnaHR0cDovL21hcHMuZ29vZ2xlLmNvbS8/cT0nICsgYWRkcmVzcyk7XG4gICAgJCgnLmxvY2F0aW9uLXRvcHBlcl9fdGl0bGUnKS50ZXh0KGxvY2F0aW9uLmRlc2NyaXB0aW9uKTtcbiAgICAkKCcubG9jYXRpb24tdG9wcGVyX190d2l0dGVyJykudGV4dCgnQCcgKyBsb2NhdGlvbi50d2l0dGVyKS5hdHRyKCdocmVmJywgJ2h0dHBzOi8vdHdpdHRlci5jb20vJyArIGxvY2F0aW9uLnR3aXR0ZXIpO1xuICAgICQoJy5sb2NhdGlvbi10b3BwZXJfX3RpdGxlJykuYWZ0ZXIobG9uZ0Rlc2NyaXB0aW9uKTtcblxuICAgIGlmIChpc1RoaXNPcGVuKGxvY2F0aW9uKSkge1xuICAgICAgJCgnYm9keScpLmFkZENsYXNzKCdqcy1sb2NhdGlvbi1pcy1vcGVuJyk7XG4gICAgICAkKCcubG9jYXRpb24tdG9wcGVyX19zdGF0dXMnKS50ZXh0KCdPcGVuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnanMtbG9jYXRpb24taXMtY2xvc2VkJyk7XG4gICAgICAkKCcubG9jYXRpb24tdG9wcGVyX19zdGF0dXMnKS50ZXh0KCdDbG9zZWQnKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvcGVuQ3VycmVudE1lbnUobG9jYXRpb24pIHtcbiAgICAvLyBpZiAoaXNUaGlzT3Blbihsb2NhdGlvbikpIHtcbiAgICAkKCcuZGVmYXVsdC1yZXBlYXRlcl9faXRlbS0tbWVudS0taG91cnMnKS5hZGRDbGFzcygnanMtcmVwZWF0ZXItaXMtb3BlbicpO1xuICAgIHZhciBsb2NhdGlvblNsdWcgPSB2b2lkIDA7XG4gICAgbG9jYXRpb24ubWVhbHMuZm9yRWFjaChmdW5jdGlvbiAobWVhbCwgaSkge1xuICAgICAgZm9yICh2YXIgayBpbiBtZWFsLmRheXMpIHtcbiAgICAgICAgaWYgKG1lYWwuZGF5c1trXSA9PT0gdG9kYXkgJiYgbWVhbC5lbmRfdGltZSA+PSBub3cgJiYgbWVhbC5zdGFydF90aW1lIDw9IG5vdykge1xuICAgICAgICAgICQoJy5kZWZhdWx0LXJlcGVhdGVyX19pdGVtLS1tZW51LS0nICsgbWVhbC5zbHVnKS5hZGRDbGFzcygnanMtcmVwZWF0ZXItaXMtb3BlbicpO1xuICAgICAgICAgICQoJy5kZWZhdWx0LXJlcGVhdGVyX19pdGVtLS1tZW51LS1ob3VycycpLnJlbW92ZUNsYXNzKCdqcy1yZXBlYXRlci1pcy1vcGVuJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICAvLyB9IGVsc2Uge1xuICAgIC8vIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNvcnRMb2NhdGlvbnNCeShvcHRpb24pIHtcbiAgICAkKCcubG9jYXRpb25zLW1vZCcpLmh0bWwoJCgnLmxvY2F0aW9uLWl0ZW0nKS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICBpZiAob3B0aW9uID09PSAnZGlzdGFuY2UnKSB7XG4gICAgICAgIHJldHVybiBwYXJzZUludChhLmdldEF0dHJpYnV0ZSgnZGF0YS0nICsgb3B0aW9uKSkgPCBwYXJzZUludChiLmdldEF0dHJpYnV0ZSgnZGF0YS0nICsgb3B0aW9uKSkgPyAtMSA6IHBhcnNlSW50KGEuZ2V0QXR0cmlidXRlKCdkYXRhLScgKyBvcHRpb24pKSA+IHBhcnNlSW50KGIuZ2V0QXR0cmlidXRlKCdkYXRhLScgKyBvcHRpb24pKSA/IDEgOiAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGEuZ2V0QXR0cmlidXRlKCdkYXRhLScgKyBvcHRpb24pIDwgYi5nZXRBdHRyaWJ1dGUoJ2RhdGEtJyArIG9wdGlvbikgPyAtMSA6IGEuZ2V0QXR0cmlidXRlKCdkYXRhLScgKyBvcHRpb24pID4gYi5nZXRBdHRyaWJ1dGUoJ2RhdGEtJyArIG9wdGlvbikgPyAxIDogMDtcbiAgICAgIH1cbiAgICB9KSk7XG4gIH1cblxuICBmdW5jdGlvbiBmaWx0ZXJMb2NhdGlvbnNCeShvcHRpb24pIHtcbiAgICBpZiAob3B0aW9uID09PSAnYWxsJykge1xuICAgICAgJCgnLmxvY2F0aW9uLWl0ZW0nKS5zaG93KCk7XG4gICAgfSBlbHNlIGlmIChvcHRpb24gPT09ICdyZXN0YXVyYW50cycpIHtcbiAgICAgICQoJy5sb2NhdGlvbi1pdGVtJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgICR0aGlzLnNob3coKTtcbiAgICAgICAgaWYgKCR0aGlzLmF0dHIoJ2RhdGEtdHJ1Y2snKSAhPT0gJ2ZhbHNlJykge1xuICAgICAgICAgICR0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoJy5sb2NhdGlvbi1pdGVtJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgICR0aGlzLnNob3coKTtcbiAgICAgICAgaWYgKCR0aGlzLmF0dHIoJ2RhdGEtJyArIG9wdGlvbikgIT09ICd0cnVlJykge1xuICAgICAgICAgICR0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0QWxsSG91cnMoY3VycmVudExvY2F0aW9uKSB7XG4gICAgY3VycmVudExvY2F0aW9uLm1lYWxzLmZvckVhY2goZnVuY3Rpb24gKG1lYWwsIGkpIHtcbiAgICAgIGZvciAodmFyIGsgaW4gbWVhbC5kYXlzKSB7XG4gICAgICAgIGRheXNbbWVhbC5kYXlzW2tdXS5hbGxIb3Vycy5wdXNoKHBhcnNlSW50KG1vbWVudChtZWFsLnN0YXJ0X3RpbWUsICdISDptbTpzcycsIGZhbHNlKS5mb3JtYXQoJ0hIbW0nKSkpO1xuICAgICAgICBkYXlzW21lYWwuZGF5c1trXV0uYWxsSG91cnMucHVzaChwYXJzZUludChtb21lbnQobWVhbC5lbmRfdGltZSwgJ0hIOm1tOnNzJywgZmFsc2UpLmZvcm1hdCgnSEhtbScpKSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBhbU9yUG0odGltZSkge1xuICAgICAgdmFyIFRpbWUgPSB0aW1lLnRvU3RyaW5nKCk7XG4gICAgICBpZiAodGltZSA9PT0gSW5maW5pdHkgfHwgdGltZSA9PT0gLUluZmluaXR5KSB7XG4gICAgICAgIHJldHVybiAnQ2xvc2VkJztcbiAgICAgIH0gZWxzZSBpZiAodGltZSA8IDEwMDApIHtcbiAgICAgICAgcmV0dXJuIFRpbWUuc2xpY2UoMCwgMSkgKyAnOicgKyBUaW1lLnNsaWNlKDEpICsgJ2FtJztcbiAgICAgIH0gZWxzZSBpZiAodGltZSA+PSAxMjAwKSB7XG4gICAgICAgIHJldHVybiBtb21lbnQoVGltZS5zbGljZSgwLCAyKSArICc6JyArIFRpbWUuc2xpY2UoMikgKyAncG0nLCAnSEg6bW1hJywgZmFsc2UpLmZvcm1hdCgnaDptbWEnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBUaW1lLnNsaWNlKDAsIDIpICsgJzonICsgVGltZS5zbGljZSgyKSArICdhbSc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgZGF5IGluIGRheXMpIHtcbiAgICAgIGRheXNbZGF5XS5taW4gPSBhbU9yUG0oTWF0aC5taW4uYXBwbHkobnVsbCwgZGF5c1tkYXldLmFsbEhvdXJzKSk7XG4gICAgICBkYXlzW2RheV0ubWF4ID0gYW1PclBtKE1hdGgubWF4LmFwcGx5KG51bGwsIGRheXNbZGF5XS5hbGxIb3VycykpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGVsbWluYXRlUmVwZWF0cyhmaXJzdCwgc2Vjb25kKSB7XG4gICAgaWYgKGZpcnN0ID09PSBzZWNvbmQpIHtcbiAgICAgIHJldHVybiBmaXJzdDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZpcnN0ICsgJyDigJMgJyArIHNlY29uZDtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzZXRIb3VycyhkYXlzKSB7XG4gICAgdmFyIG9wZW5pbmdUaW1lID0gMDtcbiAgICB2YXIgY2xvc2luZ1RpbWUgPSAwO1xuICAgIHZhciBwcmV2SW5kZXggPSAwO1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgdmFyIGRhaWx5SG91cnMgPSBbXTtcbiAgICB2YXIgc3RhcnREYXRlID0gbnVsbDtcbiAgICBmb3IgKHZhciBkYXkgaW4gZGF5cykge1xuXG4gICAgICBpbmRleCA9IE9iamVjdC5rZXlzKGRheXMpLmluZGV4T2YoZGF5KTtcblxuICAgICAgc3RhcnREYXRlID0gZGF5O1xuICAgICAgaWYgKGRheXNbZGF5XS5taW4gIT09IG9wZW5pbmdUaW1lIHx8IGRheXNbZGF5XS5tYXggIT09IGNsb3NpbmdUaW1lKSB7XG4gICAgICAgIGlmIChpbmRleCA9PT0gcHJldkluZGV4KSB7XG4gICAgICAgICAgZGFpbHlIb3Vycy5wdXNoKCc8bGk+PGI+JyArIGRheUFycmF5QWJicltpbmRleF0gKyAnOjwvYj4gPHNwYW4+JyArIGVsbWluYXRlUmVwZWF0cyhkYXlzW2RheV0ubWluLCBkYXlzW2RheV0ubWF4KSArICc8L3NwYW4+PC9saT4nKTtcbiAgICAgICAgICBwcmV2SW5kZXggPSBPYmplY3Qua2V5cyhkYXlzKS5pbmRleE9mKGRheSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPiAxKSB7XG4gICAgICAgICAgZGFpbHlIb3Vycy5wdXNoKCc8bGk+PGI+JyArIGRheUFycmF5QWJicltwcmV2SW5kZXhdICsgJyDigJMgJyArIGRheUFycmF5QWJicltpbmRleCAtIDFdICsgJzo8L2I+IDxzcGFuPicgKyBlbG1pbmF0ZVJlcGVhdHMoZGF5c1tkYXlBcnJheVtwcmV2SW5kZXhdXS5taW4sIGRheXNbZGF5QXJyYXlbcHJldkluZGV4XV0ubWF4KSArICc8L3NwYW4+PC9saT4nKTtcbiAgICAgICAgICBwcmV2SW5kZXggPSBPYmplY3Qua2V5cyhkYXlzKS5pbmRleE9mKGRheSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJldkluZGV4ID0gT2JqZWN0LmtleXMoZGF5cykuaW5kZXhPZihkYXkpO1xuICAgICAgICB9XG4gICAgICAgIG9wZW5pbmdUaW1lID0gZGF5c1tkYXldLm1pbjtcbiAgICAgICAgY2xvc2luZ1RpbWUgPSBkYXlzW2RheV0ubWF4O1xuICAgICAgfVxuXG4gICAgICBpZiAoaW5kZXggPT09IDYpIHtcbiAgICAgICAgaWYgKHByZXZJbmRleCA9PT0gMCAmJiBkYXlzW2RheV0ubWluID09PSBvcGVuaW5nVGltZSAmJiBkYXlzW2RheV0ubWF4ID09PSBjbG9zaW5nVGltZSkge1xuICAgICAgICAgIC8vIHNhbWUgYXMgYWxsIGRheXMgc2luY2Ugc3VuZGF5XG4gICAgICAgICAgZGFpbHlIb3VycyA9IFsnPGxpPjxiPkV2ZXJ5ZGF5OjwvYj4gPHNwYW4+JyArIGVsbWluYXRlUmVwZWF0cyhkYXlzW2RheV0ubWluLCBkYXlzW2RheV0ubWF4KSArICc8L3NwYW4+PC9saT4nXTtcbiAgICAgICAgfSBlbHNlIGlmIChwcmV2SW5kZXggIT09IDAgJiYgZGF5c1tkYXldLm1pbiA9PT0gb3BlbmluZ1RpbWUgJiYgZGF5c1tkYXldLm1heCA9PT0gY2xvc2luZ1RpbWUpIHtcbiAgICAgICAgICAvLyBzYW1lIGFzIHByZXZpb3VzIGRheXNcbiAgICAgICAgICBkYWlseUhvdXJzLnB1c2goJzxsaT48Yj4nICsgZWxtaW5hdGVSZXBlYXRzKGRheUFycmF5QWJicltwcmV2SW5kZXhdLCBkYXlBcnJheUFiYnJbaW5kZXhdKSArICc6PC9iPiA8c3Bhbj4nICsgZWxtaW5hdGVSZXBlYXRzKGRheXNbZGF5QXJyYXlbcHJldkluZGV4XV0ubWluLCBkYXlzW2RheUFycmF5W3ByZXZJbmRleF1dLm1heCkgKyAnPC9zcGFuPjwvbGk+Jyk7XG4gICAgICAgIH0gZWxzZSBpZiAocHJldkluZGV4ICE9PSAwICYmIGRheXNbZGF5XS5taW4gIT09IG9wZW5pbmdUaW1lIHx8IGRheXNbZGF5XS5tYXggIT09IGNsb3NpbmdUaW1lKSB7XG4gICAgICAgICAgLy8gZGlmZmVyZW50IGZyb20gcHJldmlvdXMgc3BhbiBvZiBkYXlzXG4gICAgICAgICAgZGFpbHlIb3Vycy5wdXNoKCc8bGk+PGI+JyArIGVsbWluYXRlUmVwZWF0cyhkYXlBcnJheUFiYnJbcHJldkluZGV4XSwgZGF5QXJyYXlBYmJyW2luZGV4IC0gMV0pICsgJzo8L2I+IDxzcGFuPicgKyBlbG1pbmF0ZVJlcGVhdHMoZGF5c1tkYXlBcnJheVtwcmV2SW5kZXhdXS5taW4sIGRheXNbZGF5QXJyYXlbcHJldkluZGV4XV0ubWF4KSArICc8L3NwYW4+PC9saT4nKTtcbiAgICAgICAgICBkYWlseUhvdXJzLnB1c2goJzxsaT48Yj4nICsgZGF5QXJyYXlBYmJyW2luZGV4XSArICc6PC9iPiA8c3Bhbj4nICsgZWxtaW5hdGVSZXBlYXRzKGRheXNbZGF5XS5taW4sIGRheXNbZGF5XS5tYXgpICsgJzwvc3Bhbj48L2xpPicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRhaWx5SG91cnMucHVzaCgnPGxpPjxiPicgKyBkYXlBcnJheUFiYnJbaW5kZXhdICsgJzo8L2I+IDxzcGFuPicgKyBlbG1pbmF0ZVJlcGVhdHMoZGF5c1tkYXldLm1pbiwgZGF5c1tkYXldLm1heCkgKyAnPC9zcGFuPjwvbGk+Jyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gcmVwbGFjZSBzYXQgJiYgc3VuIHdpdGggd2Vla2VuZFxuICAgIGlmIChkYWlseUhvdXJzW2RhaWx5SG91cnMubGVuZ3RoXSA+IDAgJiYgZGFpbHlIb3Vyc1tkYWlseUhvdXJzLmxlbmd0aCAtIDFdLnNsaWNlKDEwKSA9PT0gZGFpbHlIb3Vyc1swXS5zbGljZSgxMCkpIHtcbiAgICAgIGRhaWx5SG91cnNbMF0gPSAnPGxpPjxiPldlZWtlbmRzICcgKyBkYWlseUhvdXJzWzBdLnNsaWNlKDEwKTtcbiAgICAgIGRhaWx5SG91cnNbZGFpbHlIb3Vycy5sZW5ndGggLSAxXSA9ICcnO1xuICAgIH1cblxuICAgIGlmIChkYWlseUhvdXJzWzFdICYmIGRhaWx5SG91cnNbMV0uc2xpY2UoMCwgMTYpID09PSBcIjxsaT48Yj5Nb24g4oCTIEZyaVwiKSB7XG4gICAgICBkYWlseUhvdXJzWzFdID0gJzxsaT48Yj5XZWVrZGF5cycgKyBkYWlseUhvdXJzWzFdLnNsaWNlKDE2KTtcbiAgICB9XG5cbiAgICBpZiAoZGFpbHlIb3Vyc1swXSA9PT0gXCI8bGk+PGI+RXZlcnlkYXk6PC9iPiA8c3Bhbj4wOmFtIOKAkyAxMTo1OXBtPC9zcGFuPjwvbGk+XCIpIHtcbiAgICAgIGRhaWx5SG91cnNbMF0gPSBcIjxsaT48Yj5FdmVyeWRheTo8L2I+IDxzcGFuPjI0IEhvdXJzPC9zcGFuPjwvbGk+XCI7XG4gICAgfVxuXG4gICAgZGFpbHlIb3Vycy5mb3JFYWNoKGZ1bmN0aW9uIChob3Vycykge1xuICAgICAgJCgnLmhvdXJzX19saXN0JykuYXBwZW5kKGhvdXJzKTtcbiAgICB9KTtcbiAgfTtcblxuICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uICgpIHtcbiAgICBpc01vYmlsZSA9ICQod2luZG93KS53aWR0aCgpIDwgNzY4O1xuICAgIGNvbnNvbGUubG9nKGlzTW9iaWxlKTtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gcmVzZXRNYXAobGF0LCBsb25nKSB7XG4gICAgaWYgKGlzTW9iaWxlKSB7XG4gICAgICAkKFwiLm1hcC1jb250YWluZXJcIikuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoISQoJ2JvZHknKS5oYXNDbGFzcygnbWFwLWlzLWZ1bGxzY3JlZW4nKSkge1xuICAgICAgICAgICQoXCJib2R5XCIpLmFkZENsYXNzKFwibWFwLWlzLWZ1bGxzY3JlZW5cIik7XG4gICAgICAgICAgaW5pdE1hcCh0cnVlLCBsYXQsIGxvbmcpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgICQoXCIubWFwLWNsb3NlXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJChcImJvZHlcIikucmVtb3ZlQ2xhc3MoXCJtYXAtaXMtZnVsbHNjcmVlblwiKTtcbiAgICAgICAgaW5pdE1hcChmYWxzZSwgbGF0LCBsb25nKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXRMb2NhdGlvbkluZGV4KCkge1xuICAgIGNvbnNvbGUubG9nKCdpcyBpbmRleCcpO1xuXG4gICAgaW5pdE1hcCghaXNNb2JpbGUpLnRoZW4oZnVuY3Rpb24gKHVzZXJMb2NhdGlvbikge1xuICAgICAgY29uc29sZS5sb2coJ3ByaW50aW5nICcgKyB1c2VyTG9jYXRpb24pO1xuICAgICAgYnVpbGRMb2NhdGlvbnNJbmRleCgpO1xuICAgICAgc29ydExvY2F0aW9uc0J5KCdkaXN0YW5jZScpO1xuICAgICAgJCgnLmxvY2F0aW9uLWl0ZW0tLXRlbXAsIC5sb2NhdGlvbi1pdGVtLS1jbG92ZXJ0cmszJykucmVtb3ZlKCk7XG4gICAgICByZXNldE1hcCgpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5pdExvY2F0aW9uU2luZ2xlKCkge1xuICAgIGNvbnNvbGUubG9nKCdpcyBzaW5nbGUnKTtcbiAgICB2YXIgY3VycmVudExvY2F0aW9uID0gc2V0Q3VycmVudFBhZ2UoZWFjaExvY2F0aW9uKTtcbiAgICBpbml0TWFwKCFpc01vYmlsZSwgY3VycmVudExvY2F0aW9uLmxhdGl0dWRlLCBjdXJyZW50TG9jYXRpb24ubG9uZ2l0dWRlKTtcbiAgICBzZXRBbGxIb3VycyhjdXJyZW50TG9jYXRpb24pO1xuICAgIHNldEhvdXJzKGRheXMpO1xuICAgIHNldE1lbnUoY3VycmVudExvY2F0aW9uKTtcbiAgICBzZXRTaW5nbGVUb3BwZXJJbmZvKGN1cnJlbnRMb2NhdGlvbik7XG4gICAgb3BlbkN1cnJlbnRNZW51KGN1cnJlbnRMb2NhdGlvbik7XG4gICAgcmVzZXRNYXAoY3VycmVudExvY2F0aW9uLmxhdGl0dWRlLCBjdXJyZW50TG9jYXRpb24ubG9uZ2l0dWRlKTtcbiAgfVxuXG4gIGlmICgkKCdib2R5JykuaGFzQ2xhc3MoJ3BhZ2UtY2hpbGQnKSkge1xuICAgIGluaXRMb2NhdGlvblNpbmdsZSgpO1xuICB9IGVsc2Uge1xuICAgIGluaXRMb2NhdGlvbkluZGV4KCk7XG4gIH1cblxuICAkKCdib2R5Jykub24oJ2NsaWNrJywgJy5tZW51LWluZm9fX3RyaWdnZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgJCh0aGlzKS5jbG9zZXN0KCcubWVudS1pbmZvX19tb2QnKS50b2dnbGVDbGFzcygnbW9kYWwtaXMtYWN0aXZlJyk7XG4gICAgJCgnLm5hdicpLnRvZ2dsZUNsYXNzKCduYXYtaGlkZGVuJyk7XG4gIH0pO1xuXG4gICQoZG9jdW1lbnQpLmtleXVwKGZ1bmN0aW9uIChlKSB7XG4gICAgJCgnLm1lbnUtaW5mb19fbW9kJykucmVtb3ZlQ2xhc3MoJ21vZGFsLWlzLWFjdGl2ZScpO1xuICAgICQoJy5uYXYnKS5yZW1vdmVDbGFzcygnbmF2LWhpZGRlbicpO1xuICB9KTtcblxuICAkKCcjc29ydCcpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNvcnRCeSA9ICQodGhpcykuZmluZCgnOnNlbGVjdGVkJykudmFsKCk7XG4gICAgc29ydExvY2F0aW9uc0J5KHNvcnRCeSk7XG4gIH0pO1xuXG4gICQoJyNmaWx0ZXInKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgIHZhciBmaWx0ZXJCeSA9ICQodGhpcykuZmluZCgnOnNlbGVjdGVkJykudmFsKCk7XG4gICAgZmlsdGVyTG9jYXRpb25zQnkoZmlsdGVyQnkpO1xuICB9KTtcbn0pO1xuXG59LHt9XX0se30sWzFdKTtcbiJdLCJmaWxlIjoiY2xvdmVyLWFwaS5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
