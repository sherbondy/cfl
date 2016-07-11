jQuery( document ).ready( function( $ ) {

  var locations = apiResponse.locations;
  for (var key in locations) {
   if (! locations.hasOwnProperty(key)) continue;
     var loc = locations[key];
     console.log('tests ' + loc.slug);
  }

});
