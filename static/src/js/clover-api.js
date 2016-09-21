jQuery( document ).ready( function( $ ) {
  let locations = apiResponse;
  let eachLocation = locations.locations;
  let apiURL = 'https://menu.cloverfoodlab.com/api/';
  let themeLoc = '/wp-content/themes/clover-theme';
  let userLocation = new google.maps.LatLng(42.3601, -71.0589);
  let today = moment().format('dddd');
  let now = moment().format('HH:mm:ss');
  let days = {'Sunday': {'allHours':[]}, 'Monday': {'allHours':[]}, 'Tuesday': {'allHours':[]}, 'Wednesday': {'allHours':[]}, 'Thursday': {'allHours':[]}, 'Friday': {'allHours':[]}, 'Saturday': {'allHours':[]}};
  let dayArray = Object.keys( days );
  let dayArrayAbbr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  let isMobile = $(window).width() < 768;


  function initMap(isDraggable, lat, lng) {
    let styles = [
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
    let map = new google.maps.Map(document.getElementById('map'), {
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
    } else {

      let initialLocation = new google.maps.LatLng(42.3601, -71.0589);
      let browserSupportFlag;
      map.setCenter(initialLocation);
      if(navigator.geolocation) {
        browserSupportFlag = true;
        navigator.geolocation.getCurrentPosition(function(position) {
          initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
          userLocation = initialLocation;
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
        if (errorFlag === true) {
          // alert("Geolocation service failed.");
          initialLocation = new google.maps.LatLng(42.3601, -71.0589);
        } else {
          // alert("Your browser doesn't support geolocation. We've placed you in Siberia.");
          initialLocation = new google.maps.LatLng(42.3601, -71.0589);
        }
        map.setCenter(initialLocation);
      }
    }

    let infowindow = new google.maps.InfoWindow();

    let marker, i;

    for (i = 0; i < eachLocation.length; i++) {
      let locationStatus = isThisOpen(eachLocation[i]) ? 'open' : 'closed';
      let locationType = isThisATruck(eachLocation[i]) ? 'truck' : 'store';

      marker = new google.maps.Marker({
        position: new google.maps.LatLng(eachLocation[i].latitude, eachLocation[i].longitude),
        map: map,
        icon: `${themeLoc}/static/img/icon--${isThisATruck(eachLocation[i]) ? 'truck' : 'store'}-${isThisOpen(eachLocation[i]) ? 'open' : 'closed'}.svg`
      });

      google.maps.event.addListener(marker, 'mouseover', ( function(marker, i) {
        return function() {
          infowindow.setContent(eachLocation[i].description);
          infowindow.open(map, marker);
        };
      })(marker, i));

      google.maps.event.addListener(marker, 'mouseout', ( function(marker, i) {
        return function() {
          infowindow.close();
        };
      })(marker, i));

      google.maps.event.addListener(marker, 'click', ( function(marker, i) {
        return function() {
          window.location.replace(`/locations/location/?l=${eachLocation[i].slug}`);
        };
      })(marker, i));

    }
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

    return moment(time, 'HH:mm:ss', false).format('h:mma')

    // let start = moment(time, 'HH:mm:ss', false);
    // let remainder = (60 - start.minute()) % 60;
    // return moment(start).add("minutes", remainder ).format('h:mmA');
  }

  function findTodaysClosing(location) {
    let num = 0;
    let locationSlug;
    location.meals.forEach(function (meal, i) {
      // num = meal.end_time;
      for (let k in meal.days) {
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
      let locationLatLong = new google.maps.LatLng(location.latitude, location.longitude);
      let distance = google.maps.geometry.spherical.computeDistanceBetween(userLocation, locationLatLong, 3959);

      let address = `${location.address_street_1} ${location.address_city}, ${location.address_state} ${location.address_zip_code}`;
      let thisLocationID = `locations-mod-${i}`;
      let distanceDisplay = `${Math.round( distance * 10 ) / 10}mi`;
      let closingTime = findTodaysClosing(location);
      // let currentStatus = isThisOpen(location) ? `Ope`2n until ${closingTime}` : 'Closed';
      let currentStatus = isThisOpen(location) ? `Open until ${closingTime}` : 'Closed';
      let currentStatusClass = isThisOpen(location) ? 'location-item--open' : 'location-item--closed';
      let twitterUrl = `https://twitter.com/${location.twitter}`;
      let googleUrl = `http://maps.google.com/?q=${address}`;

      let $locationItem = `
      <li class="location-item location-item--${location.slug} js-has-data ${currentStatusClass}" id="${thisLocationID}" data-status="${isThisOpen(location)}" data-truck="${isThisATruck(location)}" data-distance="${distance}" data-name="${location.slug}">
        <a class="location-item-inner" href="${window.location.href.split('/locations')[0]}/locations/location/?l=${eachLocation[i].slug}">
          <div class="location-tease__img" style="background-image: url('${location.photo_url}')"> </div>
          <div class"location-tease__hgroup">
            <h3 class="location__title">
                <span class="location__title__name">${location.description}</span>
                <span class="location__title__distance">${distanceDisplay}</span>
            </h3>
            <h4 class="location__status">${currentStatus}</h4>
          </div>
        </a>
      </li>`;
      // <a class="location__twitter" href="${twitterUrl}" target="_blank">@${location.twitter}</a>
      // <a class="location__address" href="${googleUrl}" target="_blank">${address}</a>
      // <dl class="location__hours">
      //   <dt>Hours</dt>
      //   <dd class="location__hours__day"></dd>
      // </dl>
      // $locationItem.eq(i).addClass('js-has-data');
      $('.locations-mod').append($locationItem);
    }
  }

  function buildLocationsIndex() {
    eachLocation.forEach(function(location, i) {
      buildLocationItem(location, i);
    });
  }

  function parseURL(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }



  function setCurrentPage(location) {
    let expectedLoc = parseURL('l');
    let thisLocation;

    location.forEach(function(loc, i) {
      if (loc.slug === expectedLoc) {
        thisLocation = loc;
      }
    });

    return thisLocation;
  }

  function buildMenuItem(meal, slug) {
    let hours;
    if (meal.days[0] !== meal.days[meal.days.length - 1]) {
      hours = `${meal.days[0]} to ${meal.days[meal.days.length - 1]}`;
    } else {
      hours = `${meal.days[0]}`;
    }
    let menuItem = `
      <li class="default-repeater__item default-repeater__item--menu default-repeater__item--menu--${meal.slug}">
        <h4 class="default-repeater__title">${meal.name} Menu
          <span class="menu-info__hours menu-info__hours--${meal.slug}">Served ${hours}: ${returnTime(meal.start_time)} - ${returnTime(meal.end_time)}</span>
        </h4>
        <div class="default-repeater__content-mod">
          <div class="default-repeater__content default-repeater__content--${meal.slug}"></div>
        </div>
      </li>`;

    $('.default-repeater__item--menu').last().after(menuItem);
  }

  function replaceMarkDown(val) {
    val = val.replace(/\*\*.+\*\*/g, function(match, dec) {
      return '<b class="more-info__title">' + match + '</b>';
    });
    return val.replace(/\*\*/gi, "");
  }

  function buildMenu(meal, slug, i) {

    let menuApiCall = $.getJSON(`${apiURL}location/${slug}/meal/${meal.slug}`);
    menuApiCall.done( function(data) {
      // build categories
      //
      let categories =  data.categories;
      for (let key in categories) {
        let category = categories[key];
        $(`.default-repeater__content--${meal.slug}`).append(`<li class="menu__cat" data-cat="${key}-${i}"><h6 class="menu__cat-title">${category.description}</h6></li>`);
      }

      // build items
      let items = data.items;
      for (let key in items) {
        let item = items[key];
        let itemCat = item.category;
        let itemName = item.description;
        let isNew = item.is_new ? '<span class="js-is-new">New </span>' : '';
        let soldOutClass = item.availability != 1 ? 'js-is-not-available' : 'js-is-available';
        let price = `<span class="menu-price">$${item.price}</span>`;
        let itemImg = item.photo_url ? `<img class="menu-img" src="${item.photo_url}">` : '';
        let info = item.long_description.length ?`
          <div class="menu-info__mod">
            <button class="menu-info__trigger menu-info__trigger--open">?</button>
            <div class="menu-info__modal">
              ${itemImg}
              <div class="menu-info__modal--width">
                <button class="menu-info__trigger menu-info__trigger--close">Close</button>
                <h2 class="menu-info__modal-title">${item.description}</h2>
                ${replaceMarkDown(item.long_description)}
              </div>
            </div>
          </div>` : '';


        $(`[data-cat='${itemCat}-${i}']`).append(`
            <div class="menu__item ${soldOutClass}">
              <span class="menu__item-name">${isNew} ${itemName} ${info}</span> ${price}
            </div>`);
      }
    });
  }

  function setMenuHours(meal) {
    if (meal.days[0] !== meal.days[meal.days.length - 1]) {
      return `${meal.days[0]} to ${meal.days[meal.days.length - 1]}`;
    } else {
      return `${meal.days[0]}`;
    }
  }

  function setMenu(currentLocation) {
    let meals = currentLocation.meals;
    let slug = currentLocation.slug;
    let allMeals = [];
    meals.forEach(function(meal, i) {
      if ($.inArray(meal.slug, allMeals) == -1) {
        buildMenuItem(meal, slug);
        buildMenu(meal, slug, i);
        allMeals.push(meal.slug);
      } else {
        let hours = setMenuHours(meal);
        let moreHours = `, ${hours}: ${returnTime(meal.start_time)} - ${returnTime(meal.end_time)}`
        $(`.menu-info__hours--${meal.slug}`).append(moreHours);
      }
    });

    $('.default-repeater__item--menu:eq(0)').remove();
  }

  function setSingleTopperInfo(location) {
    let address = `${location.address_street_1} ${location.address_city}, ${location.address_state} ${location.address_zip_code}`;
    let longDescription = location.long_description ? `<p class="location-topper__about">${location.long_description}</p>` : '';
    $('.location-address').text(address).attr('href', `http://maps.google.com/?q=${address}`);
    $('.location-topper__title').text(location.description);
    $('.location-topper__twitter').text(`@${location.twitter}`).attr('href', `https://twitter.com/${location.twitter}`);
    $('.location-topper__title').after(longDescription);

    if (isThisOpen(location)) {
      $('body').addClass('js-location-is-open');
      $('.location-topper__status').text('Open');
    } else {
      $('body').addClass('js-location-is-closed')
      $('.location-topper__status').text('Closed');
    }
  }

  function openCurrentMenu(location) {
    // if (isThisOpen(location)) {
      $('.default-repeater__item--menu--hours').addClass('js-repeater-is-open');
      let locationSlug;
      location.meals.forEach(function (meal, i) {
        for (let k in meal.days) {
          if (meal.days[k] === today && meal.end_time >= now && meal.start_time <= now) {
            $(`.default-repeater__item--menu--${meal.slug}`).addClass('js-repeater-is-open');
            $('.default-repeater__item--menu--hours').removeClass('js-repeater-is-open');
          }
        }
      });
    // } else {
    // }
  }

  function sortLocationsBy(option) {
    $('.locations-mod').html(
      $('.location-item').sort(function (a, b) {
        if (option === 'distance') {
          return (parseInt(a.getAttribute(`data-${option}`)) < parseInt(b.getAttribute(`data-${option}`))) ? -1 : (parseInt(a.getAttribute(`data-${option}`)) > parseInt(b.getAttribute(`data-${option}`))) ? 1 : 0;
        } else {
          return (a.getAttribute(`data-${option}`) < b.getAttribute(`data-${option}`)) ? -1 : (a.getAttribute(`data-${option}`) > b.getAttribute(`data-${option}`)) ? 1 : 0;
        }
      })
    )
  }

  function filterLocationsBy(option) {
    if (option === 'all') {
      $('.location-item').show();
    } else if (option === 'restaurants') {
      $('.location-item').each(function() {
        let $this = $(this);
        $this.show();
        if ( $this.attr(`data-truck`) !== 'false' ) {
          $this.hide();
        }
      })
    } else {
      $('.location-item').each(function() {
        let $this = $(this);
        $this.show();
        if ( $this.attr(`data-${option}`) !== 'true' ) {
          $this.hide();
        }
      })
    }
  }

  function setAllHours(currentLocation) {
    currentLocation.meals.forEach(function (meal, i) {
      for (let k in meal.days) {
        days[meal.days[k]].allHours.push(parseInt(moment(meal.start_time, 'HH:mm:ss', false).format('HHmm')));
        days[meal.days[k]].allHours.push(parseInt(moment(meal.end_time, 'HH:mm:ss', false).format('HHmm')));
      }
    });

    function amOrPm(time) {
      let Time = time.toString();
      if (time === Infinity || time === -Infinity) {
        return 'Closed';
      } else if (time < 1000) {
        return `${Time.slice(0, 1)}:${Time.slice(1)}am`
      } else if (time >= 1200) {
        return moment(`${Time.slice(0, 2)}:${Time.slice(2)}pm`, 'HH:mma', false).format('h:mma');
      } else {
        return `${Time.slice(0, 2)}:${Time.slice(2)}am`
      }
    }


    for (let day in days) {
      days[day].min = amOrPm(Math.min.apply(null, days[day].allHours));
      days[day].max = amOrPm(Math.max.apply(null, days[day].allHours));
    }
  }

  function elminateRepeats(first, second) {
    if (first === second) {
      return first
    } else {
      return `${first} – ${second}`;
    }
  }

  function setHours(days) {
    let openingTime = 0;
    let closingTime = 0;
    let prevIndex = 0;
    let index = 0;
    let dailyHours = [];
    let startDate = null;
    for (let day in days) {

      index = Object.keys(days).indexOf(day);

      startDate = day;
      if (days[day].min !== openingTime || days[day].max !== closingTime) {
        if (index === prevIndex) {
          dailyHours.push(`<li><b>${dayArrayAbbr[index]}:</b> <span>${elminateRepeats(days[day].min, days[day].max)}</span></li>`);
          prevIndex = Object.keys(days).indexOf(day);
        } else if ( index > 1 ) {
          dailyHours.push(`<li><b>${dayArrayAbbr[prevIndex]} – ${dayArrayAbbr[index - 1]}:</b> <span>${elminateRepeats(days[dayArray[prevIndex]].min, days[dayArray[prevIndex]].max)}</span></li>`)
          prevIndex = Object.keys(days).indexOf(day);
        } else {
          prevIndex = Object.keys(days).indexOf(day);
        }
        openingTime = days[day].min;
        closingTime = days[day].max;
      }

      if ( index === 6 ) {
        if ( prevIndex === 0 && days[day].min === openingTime && days[day].max === closingTime) { // same as all days since sunday
          dailyHours = [`<li><b>Everyday:</b> <span>${elminateRepeats(days[day].min, days[day].max)}</span></li>`];
        } else if ( prevIndex !== 0 && days[day].min === openingTime && days[day].max === closingTime) { // same as previous days
          dailyHours.push(`<li><b>${elminateRepeats(dayArrayAbbr[prevIndex], dayArrayAbbr[index])}:</b> <span>${elminateRepeats(days[dayArray[prevIndex]].min, days[dayArray[prevIndex]].max)}</span></li>`);
        } else if ( prevIndex !== 0 && days[day].min !== openingTime || days[day].max !== closingTime) { // different from previous span of days
          dailyHours.push(`<li><b>${elminateRepeats(dayArrayAbbr[prevIndex], dayArrayAbbr[index - 1])}:</b> <span>${elminateRepeats(days[dayArray[prevIndex]].min, days[dayArray[prevIndex]].max)}</span></li>`);
          dailyHours.push(`<li><b>${dayArrayAbbr[index]}:</b> <span>${elminateRepeats(days[day].min, days[day].max)}</span></li>`);
        } else {
          dailyHours.push(`<li><b>${dayArrayAbbr[index]}:</b> <span>${elminateRepeats(days[day].min, days[day].max)}</span></li>`);
        }
      }
    }
    // replace sat && sun with weekend
    if (dailyHours[dailyHours.length] > 0 && dailyHours[dailyHours.length-1].slice(10) === dailyHours[0].slice(10)) {
        dailyHours[0] = `<li><b>Weekends ${dailyHours[0].slice(10)}`;
        dailyHours[dailyHours.length-1] = '';
    }

    if (dailyHours[1] && dailyHours[1].slice(0, 16) === "<li><b>Mon – Fri") {
      dailyHours[1] = `<li><b>Weekdays${dailyHours[1].slice(16)}`;
    }

    if (dailyHours[0] === "<li><b>Everyday:</b> <span>0:am – 11:59pm</span></li>") {
      dailyHours[0] = "<li><b>Everyday:</b> <span>24 Hours</span></li>"
    }

    dailyHours.forEach(function(hours) {
      $('.hours__list').append(hours);
    })
  };


  $( window ).resize(function() {
    isMobile = $(window).width() < 768;
    console.log(isMobile)
  });

  function resetMap(lat, long) {
    if (isMobile) {
      $(".map-container").click(function() {
        if (!$('body').hasClass('map-is-fullscreen')) {
          $("body").addClass("map-is-fullscreen");
          initMap(true, lat, long);
        }
      });
      $(".map-close").click(function() {
        $("body").removeClass("map-is-fullscreen");
        initMap(false, lat, long);
      });
    }
  }

  function initLocationIndex() {
    console.log('is index');
    initMap(!isMobile);
    buildLocationsIndex();
    sortLocationsBy('distance');
    $('.location-item--temp, .location-item--clovertrk3').remove();

    resetMap();
  }

  function initLocationSingle() {
    console.log('is single');
    let currentLocation = setCurrentPage(eachLocation);
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


  $('body').on('click', '.menu-info__trigger', function() {
    $(this).closest('.menu-info__mod').toggleClass('modal-is-active');
  })

  $(document).keyup(function(e) {
    $('.menu-info__mod').removeClass('modal-is-active');
  });

  $('#sort').on('change', function() {
    let sortBy = $(this).find(':selected').val();
    sortLocationsBy(sortBy);
  })


  $('#filter').on('change', function() {
    let filterBy = $(this).find(':selected').val();
    filterLocationsBy(filterBy);
  })

});
