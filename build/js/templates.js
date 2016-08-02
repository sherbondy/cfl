this["MyApp"] = this["MyApp"] || {};
this["MyApp"]["templates"] = this["MyApp"]["templates"] || {};
this["MyApp"]["templates"]["locations"] = this["MyApp"]["templates"]["locations"] || {};
this["MyApp"]["templates"]["locations"]["tease"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "  <li class=\"location-item locations-mod--0 js-has-data\">\n    <h3 class=\"location__title\">\n      <span class=\"location__title__name\">CloverBLV (Brookline)</span>\n      <span class=\"location__title__distance\">0.2mi</span>\n    </h3>\n    <h4 class=\"location__status\">Closed</h4>\n    <a class=\"location__twitter\" href=\"https://twitter.com/cloverBLV\" target=\"_blank\">@cloverBLV</a>\n    <a class=\"location__address\" href=\"http://maps.google.com/?q=6 Harvard St. Brookline, MA 02445\">6 Harvard St. Brookline, MA 02445</a>\n    <dl class=\"location__hours\">\n      <dt>Hours</dt>\n      <dd class=\"location__hours__day\"></dd>\n    </dl>\n  </li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.locations : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"useData":true});