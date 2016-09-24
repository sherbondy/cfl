(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

jQuery(document).ready(function ($) {
  /*! pace 1.0.2 */
  (function () {
    var a,
        b,
        c,
        d,
        e,
        f,
        g,
        h,
        i,
        j,
        k,
        l,
        m,
        n,
        o,
        p,
        q,
        r,
        s,
        t,
        u,
        _v,
        w,
        x,
        y,
        z,
        A,
        B,
        C,
        D,
        E,
        F,
        G,
        H,
        I,
        J,
        K,
        L,
        M,
        N,
        O,
        P,
        Q,
        R,
        S,
        T,
        U,
        V,
        W,
        X = [].slice,
        Y = {}.hasOwnProperty,
        Z = function Z(a, b) {
      function c() {
        this.constructor = a;
      }for (var d in b) {
        Y.call(b, d) && (a[d] = b[d]);
      }return c.prototype = b.prototype, a.prototype = new c(), a.__super__ = b.prototype, a;
    },
        $ = [].indexOf || function (a) {
      for (var b = 0, c = this.length; c > b; b++) {
        if (b in this && this[b] === a) return b;
      }return -1;
    };for (u = { catchupTime: 100, initialRate: .03, minTime: 250, ghostTime: 100, maxProgressPerFrame: 20, easeFactor: 1.25, startOnPageLoad: !0, restartOnPushState: !0, restartOnRequestAfter: 500, target: "body", elements: { checkInterval: 100, selectors: ["body"] }, eventLag: { minSamples: 10, sampleCount: 3, lagThreshold: 3 }, ajax: { trackMethods: ["GET"], trackWebSockets: !0, ignoreURLs: [] } }, C = function C() {
      var a;return null != (a = "undefined" != typeof performance && null !== performance && "function" == typeof performance.now ? performance.now() : void 0) ? a : +new Date();
    }, E = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame, t = window.cancelAnimationFrame || window.mozCancelAnimationFrame, null == E && (E = function E(a) {
      return setTimeout(a, 50);
    }, t = function t(a) {
      return clearTimeout(a);
    }), G = function G(a) {
      var b, _c;return b = C(), (_c = function c() {
        var d;return d = C() - b, d >= 33 ? (b = C(), a(d, function () {
          return E(_c);
        })) : setTimeout(_c, 33 - d);
      })();
    }, F = function F() {
      var a, b, c;return c = arguments[0], b = arguments[1], a = 3 <= arguments.length ? X.call(arguments, 2) : [], "function" == typeof c[b] ? c[b].apply(c, a) : c[b];
    }, _v = function v() {
      var a, b, c, d, e, f, g;for (b = arguments[0], d = 2 <= arguments.length ? X.call(arguments, 1) : [], f = 0, g = d.length; g > f; f++) {
        if (c = d[f]) for (a in c) {
          Y.call(c, a) && (e = c[a], null != b[a] && "object" == _typeof(b[a]) && null != e && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) ? _v(b[a], e) : b[a] = e);
        }
      }return b;
    }, q = function q(a) {
      var b, c, d, e, f;for (c = b = 0, e = 0, f = a.length; f > e; e++) {
        d = a[e], c += Math.abs(d), b++;
      }return c / b;
    }, x = function x(a, b) {
      var c, d, e;if (null == a && (a = "options"), null == b && (b = !0), e = document.querySelector("[data-pace-" + a + "]")) {
        if (c = e.getAttribute("data-pace-" + a), !b) return c;try {
          return JSON.parse(c);
        } catch (f) {
          return d = f, "undefined" != typeof console && null !== console ? console.error("Error parsing inline pace options", d) : void 0;
        }
      }
    }, g = function () {
      function a() {}return a.prototype.on = function (a, b, c, d) {
        var e;return null == d && (d = !1), null == this.bindings && (this.bindings = {}), null == (e = this.bindings)[a] && (e[a] = []), this.bindings[a].push({ handler: b, ctx: c, once: d });
      }, a.prototype.once = function (a, b, c) {
        return this.on(a, b, c, !0);
      }, a.prototype.off = function (a, b) {
        var c, d, e;if (null != (null != (d = this.bindings) ? d[a] : void 0)) {
          if (null == b) return delete this.bindings[a];for (c = 0, e = []; c < this.bindings[a].length;) {
            e.push(this.bindings[a][c].handler === b ? this.bindings[a].splice(c, 1) : c++);
          }return e;
        }
      }, a.prototype.trigger = function () {
        var a, b, c, d, e, f, g, h, i;if (c = arguments[0], a = 2 <= arguments.length ? X.call(arguments, 1) : [], null != (g = this.bindings) ? g[c] : void 0) {
          for (e = 0, i = []; e < this.bindings[c].length;) {
            h = this.bindings[c][e], d = h.handler, b = h.ctx, f = h.once, d.apply(null != b ? b : this, a), i.push(f ? this.bindings[c].splice(e, 1) : e++);
          }return i;
        }
      }, a;
    }(), j = window.Pace || {}, window.Pace = j, _v(j, g.prototype), D = j.options = _v({}, u, window.paceOptions, x()), U = ["ajax", "document", "eventLag", "elements"], Q = 0, S = U.length; S > Q; Q++) {
      K = U[Q], D[K] === !0 && (D[K] = u[K]);
    }i = function (a) {
      function b() {
        return V = b.__super__.constructor.apply(this, arguments);
      }return Z(b, a), b;
    }(Error), b = function () {
      function a() {
        this.progress = 0;
      }return a.prototype.getElement = function () {
        var a;if (null == this.el) {
          if (a = document.querySelector(D.target), !a) throw new i();this.el = document.createElement("div"), this.el.className = "pace pace-active", document.body.className = document.body.className.replace(/pace-done/g, ""), document.body.className += " pace-running", this.el.innerHTML = '<div class="pace-progress">\n  <div class="pace-progress-inner"></div>\n</div>\n<div class="pace-activity"></div>', null != a.firstChild ? a.insertBefore(this.el, a.firstChild) : a.appendChild(this.el);
        }return this.el;
      }, a.prototype.finish = function () {
        var a;return a = this.getElement(), a.className = a.className.replace("pace-active", ""), a.className += " pace-inactive", document.body.className = document.body.className.replace("pace-running", ""), document.body.className += " pace-done";
      }, a.prototype.update = function (a) {
        return this.progress = a, this.render();
      }, a.prototype.destroy = function () {
        try {
          this.getElement().parentNode.removeChild(this.getElement());
        } catch (a) {
          i = a;
        }return this.el = void 0;
      }, a.prototype.render = function () {
        var a, b, c, d, e, f, g;if (null == document.querySelector(D.target)) return !1;for (a = this.getElement(), d = "translate3d(" + this.progress + "%, 0, 0)", g = ["webkitTransform", "msTransform", "transform"], e = 0, f = g.length; f > e; e++) {
          b = g[e], a.children[0].style[b] = d;
        }return (!this.lastRenderedProgress || this.lastRenderedProgress | 0 !== this.progress | 0) && (a.children[0].setAttribute("data-progress-text", "" + (0 | this.progress) + "%"), this.progress >= 100 ? c = "99" : (c = this.progress < 10 ? "0" : "", c += 0 | this.progress), a.children[0].setAttribute("data-progress", "" + c)), this.lastRenderedProgress = this.progress;
      }, a.prototype.done = function () {
        return this.progress >= 100;
      }, a;
    }(), h = function () {
      function a() {
        this.bindings = {};
      }return a.prototype.trigger = function (a, b) {
        var c, d, e, f, g;if (null != this.bindings[a]) {
          for (f = this.bindings[a], g = [], d = 0, e = f.length; e > d; d++) {
            c = f[d], g.push(c.call(this, b));
          }return g;
        }
      }, a.prototype.on = function (a, b) {
        var c;return null == (c = this.bindings)[a] && (c[a] = []), this.bindings[a].push(b);
      }, a;
    }(), P = window.XMLHttpRequest, O = window.XDomainRequest, N = window.WebSocket, w = function w(a, b) {
      var c, d, e;e = [];for (d in b.prototype) {
        try {
          e.push(null == a[d] && "function" != typeof b[d] ? "function" == typeof Object.defineProperty ? Object.defineProperty(a, d, { get: function get() {
              return b.prototype[d];
            }, configurable: !0, enumerable: !0 }) : a[d] = b.prototype[d] : void 0);
        } catch (f) {
          c = f;
        }
      }return e;
    }, A = [], j.ignore = function () {
      var a, b, c;return b = arguments[0], a = 2 <= arguments.length ? X.call(arguments, 1) : [], A.unshift("ignore"), c = b.apply(null, a), A.shift(), c;
    }, j.track = function () {
      var a, b, c;return b = arguments[0], a = 2 <= arguments.length ? X.call(arguments, 1) : [], A.unshift("track"), c = b.apply(null, a), A.shift(), c;
    }, J = function J(a) {
      var b;if (null == a && (a = "GET"), "track" === A[0]) return "force";if (!A.length && D.ajax) {
        if ("socket" === a && D.ajax.trackWebSockets) return !0;if (b = a.toUpperCase(), $.call(D.ajax.trackMethods, b) >= 0) return !0;
      }return !1;
    }, k = function (a) {
      function b() {
        var a,
            c = this;b.__super__.constructor.apply(this, arguments), a = function a(_a) {
          var b;return b = _a.open, _a.open = function (d, e) {
            return J(d) && c.trigger("request", { type: d, url: e, request: _a }), b.apply(_a, arguments);
          };
        }, window.XMLHttpRequest = function (b) {
          var c;return c = new P(b), a(c), c;
        };try {
          w(window.XMLHttpRequest, P);
        } catch (d) {}if (null != O) {
          window.XDomainRequest = function () {
            var b;return b = new O(), a(b), b;
          };try {
            w(window.XDomainRequest, O);
          } catch (d) {}
        }if (null != N && D.ajax.trackWebSockets) {
          window.WebSocket = function (a, b) {
            var d;return d = null != b ? new N(a, b) : new N(a), J("socket") && c.trigger("request", { type: "socket", url: a, protocols: b, request: d }), d;
          };try {
            w(window.WebSocket, N);
          } catch (d) {}
        }
      }return Z(b, a), b;
    }(h), R = null, y = function y() {
      return null == R && (R = new k()), R;
    }, I = function I(a) {
      var b, c, d, e;for (e = D.ajax.ignoreURLs, c = 0, d = e.length; d > c; c++) {
        if (b = e[c], "string" == typeof b) {
          if (-1 !== a.indexOf(b)) return !0;
        } else if (b.test(a)) return !0;
      }return !1;
    }, y().on("request", function (b) {
      var c, d, e, f, g;return f = b.type, e = b.request, g = b.url, I(g) ? void 0 : j.running || D.restartOnRequestAfter === !1 && "force" !== J(f) ? void 0 : (d = arguments, c = D.restartOnRequestAfter || 0, "boolean" == typeof c && (c = 0), setTimeout(function () {
        var b, c, g, h, i, k;if (b = "socket" === f ? e.readyState < 2 : 0 < (h = e.readyState) && 4 > h) {
          for (j.restart(), i = j.sources, k = [], c = 0, g = i.length; g > c; c++) {
            if (K = i[c], K instanceof a) {
              K.watch.apply(K, d);break;
            }k.push(void 0);
          }return k;
        }
      }, c));
    }), a = function () {
      function a() {
        var a = this;this.elements = [], y().on("request", function () {
          return a.watch.apply(a, arguments);
        });
      }return a.prototype.watch = function (a) {
        var b, c, d, e;return d = a.type, b = a.request, e = a.url, I(e) ? void 0 : (c = "socket" === d ? new n(b) : new o(b), this.elements.push(c));
      }, a;
    }(), o = function () {
      function a(a) {
        var b,
            c,
            d,
            e,
            f,
            g,
            h = this;if (this.progress = 0, null != window.ProgressEvent) for (c = null, a.addEventListener("progress", function (a) {
          return h.progress = a.lengthComputable ? 100 * a.loaded / a.total : h.progress + (100 - h.progress) / 2;
        }, !1), g = ["load", "abort", "timeout", "error"], d = 0, e = g.length; e > d; d++) {
          b = g[d], a.addEventListener(b, function () {
            return h.progress = 100;
          }, !1);
        } else f = a.onreadystatechange, a.onreadystatechange = function () {
          var b;return 0 === (b = a.readyState) || 4 === b ? h.progress = 100 : 3 === a.readyState && (h.progress = 50), "function" == typeof f ? f.apply(null, arguments) : void 0;
        };
      }return a;
    }(), n = function () {
      function a(a) {
        var b,
            c,
            d,
            e,
            f = this;for (this.progress = 0, e = ["error", "open"], c = 0, d = e.length; d > c; c++) {
          b = e[c], a.addEventListener(b, function () {
            return f.progress = 100;
          }, !1);
        }
      }return a;
    }(), d = function () {
      function a(a) {
        var b, c, d, f;for (null == a && (a = {}), this.elements = [], null == a.selectors && (a.selectors = []), f = a.selectors, c = 0, d = f.length; d > c; c++) {
          b = f[c], this.elements.push(new e(b));
        }
      }return a;
    }(), e = function () {
      function a(a) {
        this.selector = a, this.progress = 0, this.check();
      }return a.prototype.check = function () {
        var a = this;return document.querySelector(this.selector) ? this.done() : setTimeout(function () {
          return a.check();
        }, D.elements.checkInterval);
      }, a.prototype.done = function () {
        return this.progress = 100;
      }, a;
    }(), c = function () {
      function a() {
        var a,
            b,
            c = this;this.progress = null != (b = this.states[document.readyState]) ? b : 100, a = document.onreadystatechange, document.onreadystatechange = function () {
          return null != c.states[document.readyState] && (c.progress = c.states[document.readyState]), "function" == typeof a ? a.apply(null, arguments) : void 0;
        };
      }return a.prototype.states = { loading: 0, interactive: 50, complete: 100 }, a;
    }(), f = function () {
      function a() {
        var a,
            b,
            c,
            d,
            e,
            f = this;this.progress = 0, a = 0, e = [], d = 0, c = C(), b = setInterval(function () {
          var g;return g = C() - c - 50, c = C(), e.push(g), e.length > D.eventLag.sampleCount && e.shift(), a = q(e), ++d >= D.eventLag.minSamples && a < D.eventLag.lagThreshold ? (f.progress = 100, clearInterval(b)) : f.progress = 100 * (3 / (a + 3));
        }, 50);
      }return a;
    }(), m = function () {
      function a(a) {
        this.source = a, this.last = this.sinceLastUpdate = 0, this.rate = D.initialRate, this.catchup = 0, this.progress = this.lastProgress = 0, null != this.source && (this.progress = F(this.source, "progress"));
      }return a.prototype.tick = function (a, b) {
        var c;return null == b && (b = F(this.source, "progress")), b >= 100 && (this.done = !0), b === this.last ? this.sinceLastUpdate += a : (this.sinceLastUpdate && (this.rate = (b - this.last) / this.sinceLastUpdate), this.catchup = (b - this.progress) / D.catchupTime, this.sinceLastUpdate = 0, this.last = b), b > this.progress && (this.progress += this.catchup * a), c = 1 - Math.pow(this.progress / 100, D.easeFactor), this.progress += c * this.rate * a, this.progress = Math.min(this.lastProgress + D.maxProgressPerFrame, this.progress), this.progress = Math.max(0, this.progress), this.progress = Math.min(100, this.progress), this.lastProgress = this.progress, this.progress;
      }, a;
    }(), L = null, H = null, r = null, M = null, p = null, s = null, j.running = !1, z = function z() {
      return D.restartOnPushState ? j.restart() : void 0;
    }, null != window.history.pushState && (T = window.history.pushState, window.history.pushState = function () {
      return z(), T.apply(window.history, arguments);
    }), null != window.history.replaceState && (W = window.history.replaceState, window.history.replaceState = function () {
      return z(), W.apply(window.history, arguments);
    }), l = { ajax: a, elements: d, document: c, eventLag: f }, (B = function B() {
      var a, c, d, e, f, g, h, i;for (j.sources = L = [], g = ["ajax", "elements", "document", "eventLag"], c = 0, e = g.length; e > c; c++) {
        a = g[c], D[a] !== !1 && L.push(new l[a](D[a]));
      }for (i = null != (h = D.extraSources) ? h : [], d = 0, f = i.length; f > d; d++) {
        K = i[d], L.push(new K(D));
      }return j.bar = r = new b(), H = [], M = new m();
    })(), j.stop = function () {
      return j.trigger("stop"), j.running = !1, r.destroy(), s = !0, null != p && ("function" == typeof t && t(p), p = null), B();
    }, j.restart = function () {
      return j.trigger("restart"), j.stop(), j.start();
    }, j.go = function () {
      var a;return j.running = !0, r.render(), a = C(), s = !1, p = G(function (b, c) {
        var d, e, f, g, h, i, k, l, n, o, p, q, t, u, v, w;for (l = 100 - r.progress, e = p = 0, f = !0, i = q = 0, u = L.length; u > q; i = ++q) {
          for (K = L[i], o = null != H[i] ? H[i] : H[i] = [], h = null != (w = K.elements) ? w : [K], k = t = 0, v = h.length; v > t; k = ++t) {
            g = h[k], n = null != o[k] ? o[k] : o[k] = new m(g), f &= n.done, n.done || (e++, p += n.tick(b));
          }
        }return d = p / e, r.update(M.tick(b, d)), r.done() || f || s ? (r.update(100), j.trigger("done"), setTimeout(function () {
          return r.finish(), j.running = !1, j.trigger("hide");
        }, Math.max(D.ghostTime, Math.max(D.minTime - (C() - a), 0)))) : c();
      });
    }, j.start = function (a) {
      _v(D, a), j.running = !0;try {
        r.render();
      } catch (b) {
        i = b;
      }return document.querySelector(".pace") ? (j.trigger("start"), j.go()) : setTimeout(j.start, 50);
    }, "function" == typeof define && define.amd ? define(["pace"], function () {
      return j;
    }) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? module.exports = j : D.startOnPageLoad && j.start();
  }).call(this);

  $('.default-repeater__title').on('click', function () {
    $(this).parent().toggleClass('js-repeater-is-open');
  });

  $('.tease__img').load(function () {
    var imgSrc = $(this).attr('src');
    // debugger;
    $(this).parent().css({
      'background-image': 'url("' + imgSrc + '")'
    }).addClass('tease__img-loaded');
  }).each(function () {
    if (this.complete) $(this).load();
  });

  $('.primary-search-input').on('focus', function () {
    $(this).parent().addClass('js-search-is-active');
  }).on('blur', function () {
    $(this).parent().removeClass('js-search-is-active');
  });

  // nav stuff

  var wWidth = $(window).width();

  $(window).resize(function () {
    wWidth = $(window).width();

    console.log(wWidth);
  });

  function closeNav() {
    $('body').removeClass('js-nav-active');
    $('.hidden-nav').scrollTop(0);
  }

  function openNav() {
    $('body').addClass('js-nav-active');
  }

  $('.nav__trigger').on('click', function () {
    if ($('body').hasClass('js-nav-active')) {
      closeNav();
    } else {
      openNav();
    }
  });

  if (wWidth <= 768) {
    (function () {
      var hasScrolled = function hasScrolled() {
        // debugger
        var st = $(window).scrollTop();

        // Make sure they scroll more than delta
        if (Math.abs(lastScrollTop - st) <= delta) return;

        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        if (st > lastScrollTop && st > navbarHeight) {
          // Scroll Down
          $nav.removeClass('nav-down').addClass('nav-up');
          $('body').removeClass('js-nav-active');
          closeNav();
        } else {
          // Scroll Up
          if (st + $(window).height() < $(document).height()) {
            $nav.removeClass('nav-up').addClass('nav-down');
          }
        }

        lastScrollTop = st;
      };

      // Hide Header on on scroll down
      var didScroll = void 0;
      var lastScrollTop = 0;
      var delta = 5;
      var $nav = $('.nav');
      var navbarHeight = $nav.outerHeight();
      console.log('size is right');
      $(window).scroll(function (event) {
        didScroll = true;
      });

      setInterval(function () {
        if (didScroll) {
          hasScrolled();
          didScroll = false;
        }
      }, 100);
    })();
  } else {
    closeNav();
  }

  // get welcome employee content for nav from
  // instagram feed specified in options
  function getInstagramNavContent() {
    var intervalDuration = 50;
    var intervalTotalTime = 0;

    var interval = setInterval(function () {
      // keep track of total time spent
      intervalTotalTime = intervalTotalTime + intervalDuration;

      // check to see if instagram content is on the page
      if ($('.nav .sbi_caption').length) {
        clearInterval(interval);

        // get text from caption and remove "#welcome"
        var newText = "Welcome " + $('.nav .sbi_caption').text().replace('#welcome', '') + ", our newest employee!";
        // cache newText variable
        localStorage.setItem('employeeText', newText);
        // add newText to nav
        $('.nav-employee').text(newText);
        // remove instagram feed from nav
        $('.nav #sb_instagram').remove();
      } else if (intervalTotalTime === 5000) {
        // kill interval and remove feed if it takes more than 5 seconds
        clearInterval(interval);
        $('.nav #sb_instagram').remove();
      }
    }, intervalDuration);
  }

  // Get employee text, either from local storage or instagram
  var lastUpdate = localStorage.getItem('lastUpdate');
  var now = moment();
  var last = moment.unix(lastUpdate);
  var timeSinceLastUpdate = now.diff(last, 'minutes');

  if (timeSinceLastUpdate < 60 && localStorage.getItem('employeeText').length) {
    // use cache
    $('.nav-employee').text(localStorage.getItem('employeeText'));
    $('.nav #sb_instagram').remove();
  } else {
    // get fresh data
    getInstagramNavContent();
    console.log('getting fresh data');
    localStorage.setItem('lastUpdate', moment().unix());
  }

  quickShare();
});

},{}]},{},[1]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzaXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pKHsxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxualF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoJCkge1xuICAvKiEgcGFjZSAxLjAuMiAqL1xuICAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBhLFxuICAgICAgICBiLFxuICAgICAgICBjLFxuICAgICAgICBkLFxuICAgICAgICBlLFxuICAgICAgICBmLFxuICAgICAgICBnLFxuICAgICAgICBoLFxuICAgICAgICBpLFxuICAgICAgICBqLFxuICAgICAgICBrLFxuICAgICAgICBsLFxuICAgICAgICBtLFxuICAgICAgICBuLFxuICAgICAgICBvLFxuICAgICAgICBwLFxuICAgICAgICBxLFxuICAgICAgICByLFxuICAgICAgICBzLFxuICAgICAgICB0LFxuICAgICAgICB1LFxuICAgICAgICBfdixcbiAgICAgICAgdyxcbiAgICAgICAgeCxcbiAgICAgICAgeSxcbiAgICAgICAgeixcbiAgICAgICAgQSxcbiAgICAgICAgQixcbiAgICAgICAgQyxcbiAgICAgICAgRCxcbiAgICAgICAgRSxcbiAgICAgICAgRixcbiAgICAgICAgRyxcbiAgICAgICAgSCxcbiAgICAgICAgSSxcbiAgICAgICAgSixcbiAgICAgICAgSyxcbiAgICAgICAgTCxcbiAgICAgICAgTSxcbiAgICAgICAgTixcbiAgICAgICAgTyxcbiAgICAgICAgUCxcbiAgICAgICAgUSxcbiAgICAgICAgUixcbiAgICAgICAgUyxcbiAgICAgICAgVCxcbiAgICAgICAgVSxcbiAgICAgICAgVixcbiAgICAgICAgVyxcbiAgICAgICAgWCA9IFtdLnNsaWNlLFxuICAgICAgICBZID0ge30uaGFzT3duUHJvcGVydHksXG4gICAgICAgIFogPSBmdW5jdGlvbiBaKGEsIGIpIHtcbiAgICAgIGZ1bmN0aW9uIGMoKSB7XG4gICAgICAgIHRoaXMuY29uc3RydWN0b3IgPSBhO1xuICAgICAgfWZvciAodmFyIGQgaW4gYikge1xuICAgICAgICBZLmNhbGwoYiwgZCkgJiYgKGFbZF0gPSBiW2RdKTtcbiAgICAgIH1yZXR1cm4gYy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgYS5wcm90b3R5cGUgPSBuZXcgYygpLCBhLl9fc3VwZXJfXyA9IGIucHJvdG90eXBlLCBhO1xuICAgIH0sXG4gICAgICAgICQgPSBbXS5pbmRleE9mIHx8IGZ1bmN0aW9uIChhKSB7XG4gICAgICBmb3IgKHZhciBiID0gMCwgYyA9IHRoaXMubGVuZ3RoOyBjID4gYjsgYisrKSB7XG4gICAgICAgIGlmIChiIGluIHRoaXMgJiYgdGhpc1tiXSA9PT0gYSkgcmV0dXJuIGI7XG4gICAgICB9cmV0dXJuIC0xO1xuICAgIH07Zm9yICh1ID0geyBjYXRjaHVwVGltZTogMTAwLCBpbml0aWFsUmF0ZTogLjAzLCBtaW5UaW1lOiAyNTAsIGdob3N0VGltZTogMTAwLCBtYXhQcm9ncmVzc1BlckZyYW1lOiAyMCwgZWFzZUZhY3RvcjogMS4yNSwgc3RhcnRPblBhZ2VMb2FkOiAhMCwgcmVzdGFydE9uUHVzaFN0YXRlOiAhMCwgcmVzdGFydE9uUmVxdWVzdEFmdGVyOiA1MDAsIHRhcmdldDogXCJib2R5XCIsIGVsZW1lbnRzOiB7IGNoZWNrSW50ZXJ2YWw6IDEwMCwgc2VsZWN0b3JzOiBbXCJib2R5XCJdIH0sIGV2ZW50TGFnOiB7IG1pblNhbXBsZXM6IDEwLCBzYW1wbGVDb3VudDogMywgbGFnVGhyZXNob2xkOiAzIH0sIGFqYXg6IHsgdHJhY2tNZXRob2RzOiBbXCJHRVRcIl0sIHRyYWNrV2ViU29ja2V0czogITAsIGlnbm9yZVVSTHM6IFtdIH0gfSwgQyA9IGZ1bmN0aW9uIEMoKSB7XG4gICAgICB2YXIgYTtyZXR1cm4gbnVsbCAhPSAoYSA9IFwidW5kZWZpbmVkXCIgIT0gdHlwZW9mIHBlcmZvcm1hbmNlICYmIG51bGwgIT09IHBlcmZvcm1hbmNlICYmIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgcGVyZm9ybWFuY2Uubm93ID8gcGVyZm9ybWFuY2Uubm93KCkgOiB2b2lkIDApID8gYSA6ICtuZXcgRGF0ZSgpO1xuICAgIH0sIEUgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUsIHQgPSB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgfHwgd2luZG93Lm1vekNhbmNlbEFuaW1hdGlvbkZyYW1lLCBudWxsID09IEUgJiYgKEUgPSBmdW5jdGlvbiBFKGEpIHtcbiAgICAgIHJldHVybiBzZXRUaW1lb3V0KGEsIDUwKTtcbiAgICB9LCB0ID0gZnVuY3Rpb24gdChhKSB7XG4gICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KGEpO1xuICAgIH0pLCBHID0gZnVuY3Rpb24gRyhhKSB7XG4gICAgICB2YXIgYiwgX2M7cmV0dXJuIGIgPSBDKCksIChfYyA9IGZ1bmN0aW9uIGMoKSB7XG4gICAgICAgIHZhciBkO3JldHVybiBkID0gQygpIC0gYiwgZCA+PSAzMyA/IChiID0gQygpLCBhKGQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gRShfYyk7XG4gICAgICAgIH0pKSA6IHNldFRpbWVvdXQoX2MsIDMzIC0gZCk7XG4gICAgICB9KSgpO1xuICAgIH0sIEYgPSBmdW5jdGlvbiBGKCkge1xuICAgICAgdmFyIGEsIGIsIGM7cmV0dXJuIGMgPSBhcmd1bWVudHNbMF0sIGIgPSBhcmd1bWVudHNbMV0sIGEgPSAzIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBYLmNhbGwoYXJndW1lbnRzLCAyKSA6IFtdLCBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIGNbYl0gPyBjW2JdLmFwcGx5KGMsIGEpIDogY1tiXTtcbiAgICB9LCBfdiA9IGZ1bmN0aW9uIHYoKSB7XG4gICAgICB2YXIgYSwgYiwgYywgZCwgZSwgZiwgZztmb3IgKGIgPSBhcmd1bWVudHNbMF0sIGQgPSAyIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBYLmNhbGwoYXJndW1lbnRzLCAxKSA6IFtdLCBmID0gMCwgZyA9IGQubGVuZ3RoOyBnID4gZjsgZisrKSB7XG4gICAgICAgIGlmIChjID0gZFtmXSkgZm9yIChhIGluIGMpIHtcbiAgICAgICAgICBZLmNhbGwoYywgYSkgJiYgKGUgPSBjW2FdLCBudWxsICE9IGJbYV0gJiYgXCJvYmplY3RcIiA9PSBfdHlwZW9mKGJbYV0pICYmIG51bGwgIT0gZSAmJiBcIm9iamVjdFwiID09ICh0eXBlb2YgZSA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKGUpKSA/IF92KGJbYV0sIGUpIDogYlthXSA9IGUpO1xuICAgICAgICB9XG4gICAgICB9cmV0dXJuIGI7XG4gICAgfSwgcSA9IGZ1bmN0aW9uIHEoYSkge1xuICAgICAgdmFyIGIsIGMsIGQsIGUsIGY7Zm9yIChjID0gYiA9IDAsIGUgPSAwLCBmID0gYS5sZW5ndGg7IGYgPiBlOyBlKyspIHtcbiAgICAgICAgZCA9IGFbZV0sIGMgKz0gTWF0aC5hYnMoZCksIGIrKztcbiAgICAgIH1yZXR1cm4gYyAvIGI7XG4gICAgfSwgeCA9IGZ1bmN0aW9uIHgoYSwgYikge1xuICAgICAgdmFyIGMsIGQsIGU7aWYgKG51bGwgPT0gYSAmJiAoYSA9IFwib3B0aW9uc1wiKSwgbnVsbCA9PSBiICYmIChiID0gITApLCBlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLXBhY2UtXCIgKyBhICsgXCJdXCIpKSB7XG4gICAgICAgIGlmIChjID0gZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBhY2UtXCIgKyBhKSwgIWIpIHJldHVybiBjO3RyeSB7XG4gICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoYyk7XG4gICAgICAgIH0gY2F0Y2ggKGYpIHtcbiAgICAgICAgICByZXR1cm4gZCA9IGYsIFwidW5kZWZpbmVkXCIgIT0gdHlwZW9mIGNvbnNvbGUgJiYgbnVsbCAhPT0gY29uc29sZSA/IGNvbnNvbGUuZXJyb3IoXCJFcnJvciBwYXJzaW5nIGlubGluZSBwYWNlIG9wdGlvbnNcIiwgZCkgOiB2b2lkIDA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCBnID0gZnVuY3Rpb24gKCkge1xuICAgICAgZnVuY3Rpb24gYSgpIHt9cmV0dXJuIGEucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKGEsIGIsIGMsIGQpIHtcbiAgICAgICAgdmFyIGU7cmV0dXJuIG51bGwgPT0gZCAmJiAoZCA9ICExKSwgbnVsbCA9PSB0aGlzLmJpbmRpbmdzICYmICh0aGlzLmJpbmRpbmdzID0ge30pLCBudWxsID09IChlID0gdGhpcy5iaW5kaW5ncylbYV0gJiYgKGVbYV0gPSBbXSksIHRoaXMuYmluZGluZ3NbYV0ucHVzaCh7IGhhbmRsZXI6IGIsIGN0eDogYywgb25jZTogZCB9KTtcbiAgICAgIH0sIGEucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAgICByZXR1cm4gdGhpcy5vbihhLCBiLCBjLCAhMCk7XG4gICAgICB9LCBhLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICB2YXIgYywgZCwgZTtpZiAobnVsbCAhPSAobnVsbCAhPSAoZCA9IHRoaXMuYmluZGluZ3MpID8gZFthXSA6IHZvaWQgMCkpIHtcbiAgICAgICAgICBpZiAobnVsbCA9PSBiKSByZXR1cm4gZGVsZXRlIHRoaXMuYmluZGluZ3NbYV07Zm9yIChjID0gMCwgZSA9IFtdOyBjIDwgdGhpcy5iaW5kaW5nc1thXS5sZW5ndGg7KSB7XG4gICAgICAgICAgICBlLnB1c2godGhpcy5iaW5kaW5nc1thXVtjXS5oYW5kbGVyID09PSBiID8gdGhpcy5iaW5kaW5nc1thXS5zcGxpY2UoYywgMSkgOiBjKyspO1xuICAgICAgICAgIH1yZXR1cm4gZTtcbiAgICAgICAgfVxuICAgICAgfSwgYS5wcm90b3R5cGUudHJpZ2dlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGEsIGIsIGMsIGQsIGUsIGYsIGcsIGgsIGk7aWYgKGMgPSBhcmd1bWVudHNbMF0sIGEgPSAyIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBYLmNhbGwoYXJndW1lbnRzLCAxKSA6IFtdLCBudWxsICE9IChnID0gdGhpcy5iaW5kaW5ncykgPyBnW2NdIDogdm9pZCAwKSB7XG4gICAgICAgICAgZm9yIChlID0gMCwgaSA9IFtdOyBlIDwgdGhpcy5iaW5kaW5nc1tjXS5sZW5ndGg7KSB7XG4gICAgICAgICAgICBoID0gdGhpcy5iaW5kaW5nc1tjXVtlXSwgZCA9IGguaGFuZGxlciwgYiA9IGguY3R4LCBmID0gaC5vbmNlLCBkLmFwcGx5KG51bGwgIT0gYiA/IGIgOiB0aGlzLCBhKSwgaS5wdXNoKGYgPyB0aGlzLmJpbmRpbmdzW2NdLnNwbGljZShlLCAxKSA6IGUrKyk7XG4gICAgICAgICAgfXJldHVybiBpO1xuICAgICAgICB9XG4gICAgICB9LCBhO1xuICAgIH0oKSwgaiA9IHdpbmRvdy5QYWNlIHx8IHt9LCB3aW5kb3cuUGFjZSA9IGosIF92KGosIGcucHJvdG90eXBlKSwgRCA9IGoub3B0aW9ucyA9IF92KHt9LCB1LCB3aW5kb3cucGFjZU9wdGlvbnMsIHgoKSksIFUgPSBbXCJhamF4XCIsIFwiZG9jdW1lbnRcIiwgXCJldmVudExhZ1wiLCBcImVsZW1lbnRzXCJdLCBRID0gMCwgUyA9IFUubGVuZ3RoOyBTID4gUTsgUSsrKSB7XG4gICAgICBLID0gVVtRXSwgRFtLXSA9PT0gITAgJiYgKERbS10gPSB1W0tdKTtcbiAgICB9aSA9IGZ1bmN0aW9uIChhKSB7XG4gICAgICBmdW5jdGlvbiBiKCkge1xuICAgICAgICByZXR1cm4gViA9IGIuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9cmV0dXJuIFooYiwgYSksIGI7XG4gICAgfShFcnJvciksIGIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBmdW5jdGlvbiBhKCkge1xuICAgICAgICB0aGlzLnByb2dyZXNzID0gMDtcbiAgICAgIH1yZXR1cm4gYS5wcm90b3R5cGUuZ2V0RWxlbWVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGE7aWYgKG51bGwgPT0gdGhpcy5lbCkge1xuICAgICAgICAgIGlmIChhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihELnRhcmdldCksICFhKSB0aHJvdyBuZXcgaSgpO3RoaXMuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLCB0aGlzLmVsLmNsYXNzTmFtZSA9IFwicGFjZSBwYWNlLWFjdGl2ZVwiLCBkb2N1bWVudC5ib2R5LmNsYXNzTmFtZSA9IGRvY3VtZW50LmJvZHkuY2xhc3NOYW1lLnJlcGxhY2UoL3BhY2UtZG9uZS9nLCBcIlwiKSwgZG9jdW1lbnQuYm9keS5jbGFzc05hbWUgKz0gXCIgcGFjZS1ydW5uaW5nXCIsIHRoaXMuZWwuaW5uZXJIVE1MID0gJzxkaXYgY2xhc3M9XCJwYWNlLXByb2dyZXNzXCI+XFxuICA8ZGl2IGNsYXNzPVwicGFjZS1wcm9ncmVzcy1pbm5lclwiPjwvZGl2PlxcbjwvZGl2PlxcbjxkaXYgY2xhc3M9XCJwYWNlLWFjdGl2aXR5XCI+PC9kaXY+JywgbnVsbCAhPSBhLmZpcnN0Q2hpbGQgPyBhLmluc2VydEJlZm9yZSh0aGlzLmVsLCBhLmZpcnN0Q2hpbGQpIDogYS5hcHBlbmRDaGlsZCh0aGlzLmVsKTtcbiAgICAgICAgfXJldHVybiB0aGlzLmVsO1xuICAgICAgfSwgYS5wcm90b3R5cGUuZmluaXNoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYTtyZXR1cm4gYSA9IHRoaXMuZ2V0RWxlbWVudCgpLCBhLmNsYXNzTmFtZSA9IGEuY2xhc3NOYW1lLnJlcGxhY2UoXCJwYWNlLWFjdGl2ZVwiLCBcIlwiKSwgYS5jbGFzc05hbWUgKz0gXCIgcGFjZS1pbmFjdGl2ZVwiLCBkb2N1bWVudC5ib2R5LmNsYXNzTmFtZSA9IGRvY3VtZW50LmJvZHkuY2xhc3NOYW1lLnJlcGxhY2UoXCJwYWNlLXJ1bm5pbmdcIiwgXCJcIiksIGRvY3VtZW50LmJvZHkuY2xhc3NOYW1lICs9IFwiIHBhY2UtZG9uZVwiO1xuICAgICAgfSwgYS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGEpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvZ3Jlc3MgPSBhLCB0aGlzLnJlbmRlcigpO1xuICAgICAgfSwgYS5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB0aGlzLmdldEVsZW1lbnQoKS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZ2V0RWxlbWVudCgpKTtcbiAgICAgICAgfSBjYXRjaCAoYSkge1xuICAgICAgICAgIGkgPSBhO1xuICAgICAgICB9cmV0dXJuIHRoaXMuZWwgPSB2b2lkIDA7XG4gICAgICB9LCBhLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhLCBiLCBjLCBkLCBlLCBmLCBnO2lmIChudWxsID09IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoRC50YXJnZXQpKSByZXR1cm4gITE7Zm9yIChhID0gdGhpcy5nZXRFbGVtZW50KCksIGQgPSBcInRyYW5zbGF0ZTNkKFwiICsgdGhpcy5wcm9ncmVzcyArIFwiJSwgMCwgMClcIiwgZyA9IFtcIndlYmtpdFRyYW5zZm9ybVwiLCBcIm1zVHJhbnNmb3JtXCIsIFwidHJhbnNmb3JtXCJdLCBlID0gMCwgZiA9IGcubGVuZ3RoOyBmID4gZTsgZSsrKSB7XG4gICAgICAgICAgYiA9IGdbZV0sIGEuY2hpbGRyZW5bMF0uc3R5bGVbYl0gPSBkO1xuICAgICAgICB9cmV0dXJuICghdGhpcy5sYXN0UmVuZGVyZWRQcm9ncmVzcyB8fCB0aGlzLmxhc3RSZW5kZXJlZFByb2dyZXNzIHwgMCAhPT0gdGhpcy5wcm9ncmVzcyB8IDApICYmIChhLmNoaWxkcmVuWzBdLnNldEF0dHJpYnV0ZShcImRhdGEtcHJvZ3Jlc3MtdGV4dFwiLCBcIlwiICsgKDAgfCB0aGlzLnByb2dyZXNzKSArIFwiJVwiKSwgdGhpcy5wcm9ncmVzcyA+PSAxMDAgPyBjID0gXCI5OVwiIDogKGMgPSB0aGlzLnByb2dyZXNzIDwgMTAgPyBcIjBcIiA6IFwiXCIsIGMgKz0gMCB8IHRoaXMucHJvZ3Jlc3MpLCBhLmNoaWxkcmVuWzBdLnNldEF0dHJpYnV0ZShcImRhdGEtcHJvZ3Jlc3NcIiwgXCJcIiArIGMpKSwgdGhpcy5sYXN0UmVuZGVyZWRQcm9ncmVzcyA9IHRoaXMucHJvZ3Jlc3M7XG4gICAgICB9LCBhLnByb3RvdHlwZS5kb25lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9ncmVzcyA+PSAxMDA7XG4gICAgICB9LCBhO1xuICAgIH0oKSwgaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGZ1bmN0aW9uIGEoKSB7XG4gICAgICAgIHRoaXMuYmluZGluZ3MgPSB7fTtcbiAgICAgIH1yZXR1cm4gYS5wcm90b3R5cGUudHJpZ2dlciA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIHZhciBjLCBkLCBlLCBmLCBnO2lmIChudWxsICE9IHRoaXMuYmluZGluZ3NbYV0pIHtcbiAgICAgICAgICBmb3IgKGYgPSB0aGlzLmJpbmRpbmdzW2FdLCBnID0gW10sIGQgPSAwLCBlID0gZi5sZW5ndGg7IGUgPiBkOyBkKyspIHtcbiAgICAgICAgICAgIGMgPSBmW2RdLCBnLnB1c2goYy5jYWxsKHRoaXMsIGIpKTtcbiAgICAgICAgICB9cmV0dXJuIGc7XG4gICAgICAgIH1cbiAgICAgIH0sIGEucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgdmFyIGM7cmV0dXJuIG51bGwgPT0gKGMgPSB0aGlzLmJpbmRpbmdzKVthXSAmJiAoY1thXSA9IFtdKSwgdGhpcy5iaW5kaW5nc1thXS5wdXNoKGIpO1xuICAgICAgfSwgYTtcbiAgICB9KCksIFAgPSB3aW5kb3cuWE1MSHR0cFJlcXVlc3QsIE8gPSB3aW5kb3cuWERvbWFpblJlcXVlc3QsIE4gPSB3aW5kb3cuV2ViU29ja2V0LCB3ID0gZnVuY3Rpb24gdyhhLCBiKSB7XG4gICAgICB2YXIgYywgZCwgZTtlID0gW107Zm9yIChkIGluIGIucHJvdG90eXBlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZS5wdXNoKG51bGwgPT0gYVtkXSAmJiBcImZ1bmN0aW9uXCIgIT0gdHlwZW9mIGJbZF0gPyBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhLCBkLCB7IGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgICAgICByZXR1cm4gYi5wcm90b3R5cGVbZF07XG4gICAgICAgICAgICB9LCBjb25maWd1cmFibGU6ICEwLCBlbnVtZXJhYmxlOiAhMCB9KSA6IGFbZF0gPSBiLnByb3RvdHlwZVtkXSA6IHZvaWQgMCk7XG4gICAgICAgIH0gY2F0Y2ggKGYpIHtcbiAgICAgICAgICBjID0gZjtcbiAgICAgICAgfVxuICAgICAgfXJldHVybiBlO1xuICAgIH0sIEEgPSBbXSwgai5pZ25vcmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgYSwgYiwgYztyZXR1cm4gYiA9IGFyZ3VtZW50c1swXSwgYSA9IDIgPD0gYXJndW1lbnRzLmxlbmd0aCA/IFguY2FsbChhcmd1bWVudHMsIDEpIDogW10sIEEudW5zaGlmdChcImlnbm9yZVwiKSwgYyA9IGIuYXBwbHkobnVsbCwgYSksIEEuc2hpZnQoKSwgYztcbiAgICB9LCBqLnRyYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGEsIGIsIGM7cmV0dXJuIGIgPSBhcmd1bWVudHNbMF0sIGEgPSAyIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBYLmNhbGwoYXJndW1lbnRzLCAxKSA6IFtdLCBBLnVuc2hpZnQoXCJ0cmFja1wiKSwgYyA9IGIuYXBwbHkobnVsbCwgYSksIEEuc2hpZnQoKSwgYztcbiAgICB9LCBKID0gZnVuY3Rpb24gSihhKSB7XG4gICAgICB2YXIgYjtpZiAobnVsbCA9PSBhICYmIChhID0gXCJHRVRcIiksIFwidHJhY2tcIiA9PT0gQVswXSkgcmV0dXJuIFwiZm9yY2VcIjtpZiAoIUEubGVuZ3RoICYmIEQuYWpheCkge1xuICAgICAgICBpZiAoXCJzb2NrZXRcIiA9PT0gYSAmJiBELmFqYXgudHJhY2tXZWJTb2NrZXRzKSByZXR1cm4gITA7aWYgKGIgPSBhLnRvVXBwZXJDYXNlKCksICQuY2FsbChELmFqYXgudHJhY2tNZXRob2RzLCBiKSA+PSAwKSByZXR1cm4gITA7XG4gICAgICB9cmV0dXJuICExO1xuICAgIH0sIGsgPSBmdW5jdGlvbiAoYSkge1xuICAgICAgZnVuY3Rpb24gYigpIHtcbiAgICAgICAgdmFyIGEsXG4gICAgICAgICAgICBjID0gdGhpcztiLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpLCBhID0gZnVuY3Rpb24gYShfYSkge1xuICAgICAgICAgIHZhciBiO3JldHVybiBiID0gX2Eub3BlbiwgX2Eub3BlbiA9IGZ1bmN0aW9uIChkLCBlKSB7XG4gICAgICAgICAgICByZXR1cm4gSihkKSAmJiBjLnRyaWdnZXIoXCJyZXF1ZXN0XCIsIHsgdHlwZTogZCwgdXJsOiBlLCByZXF1ZXN0OiBfYSB9KSwgYi5hcHBseShfYSwgYXJndW1lbnRzKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9LCB3aW5kb3cuWE1MSHR0cFJlcXVlc3QgPSBmdW5jdGlvbiAoYikge1xuICAgICAgICAgIHZhciBjO3JldHVybiBjID0gbmV3IFAoYiksIGEoYyksIGM7XG4gICAgICAgIH07dHJ5IHtcbiAgICAgICAgICB3KHdpbmRvdy5YTUxIdHRwUmVxdWVzdCwgUCk7XG4gICAgICAgIH0gY2F0Y2ggKGQpIHt9aWYgKG51bGwgIT0gTykge1xuICAgICAgICAgIHdpbmRvdy5YRG9tYWluUmVxdWVzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBiO3JldHVybiBiID0gbmV3IE8oKSwgYShiKSwgYjtcbiAgICAgICAgICB9O3RyeSB7XG4gICAgICAgICAgICB3KHdpbmRvdy5YRG9tYWluUmVxdWVzdCwgTyk7XG4gICAgICAgICAgfSBjYXRjaCAoZCkge31cbiAgICAgICAgfWlmIChudWxsICE9IE4gJiYgRC5hamF4LnRyYWNrV2ViU29ja2V0cykge1xuICAgICAgICAgIHdpbmRvdy5XZWJTb2NrZXQgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgdmFyIGQ7cmV0dXJuIGQgPSBudWxsICE9IGIgPyBuZXcgTihhLCBiKSA6IG5ldyBOKGEpLCBKKFwic29ja2V0XCIpICYmIGMudHJpZ2dlcihcInJlcXVlc3RcIiwgeyB0eXBlOiBcInNvY2tldFwiLCB1cmw6IGEsIHByb3RvY29sczogYiwgcmVxdWVzdDogZCB9KSwgZDtcbiAgICAgICAgICB9O3RyeSB7XG4gICAgICAgICAgICB3KHdpbmRvdy5XZWJTb2NrZXQsIE4pO1xuICAgICAgICAgIH0gY2F0Y2ggKGQpIHt9XG4gICAgICAgIH1cbiAgICAgIH1yZXR1cm4gWihiLCBhKSwgYjtcbiAgICB9KGgpLCBSID0gbnVsbCwgeSA9IGZ1bmN0aW9uIHkoKSB7XG4gICAgICByZXR1cm4gbnVsbCA9PSBSICYmIChSID0gbmV3IGsoKSksIFI7XG4gICAgfSwgSSA9IGZ1bmN0aW9uIEkoYSkge1xuICAgICAgdmFyIGIsIGMsIGQsIGU7Zm9yIChlID0gRC5hamF4Lmlnbm9yZVVSTHMsIGMgPSAwLCBkID0gZS5sZW5ndGg7IGQgPiBjOyBjKyspIHtcbiAgICAgICAgaWYgKGIgPSBlW2NdLCBcInN0cmluZ1wiID09IHR5cGVvZiBiKSB7XG4gICAgICAgICAgaWYgKC0xICE9PSBhLmluZGV4T2YoYikpIHJldHVybiAhMDtcbiAgICAgICAgfSBlbHNlIGlmIChiLnRlc3QoYSkpIHJldHVybiAhMDtcbiAgICAgIH1yZXR1cm4gITE7XG4gICAgfSwgeSgpLm9uKFwicmVxdWVzdFwiLCBmdW5jdGlvbiAoYikge1xuICAgICAgdmFyIGMsIGQsIGUsIGYsIGc7cmV0dXJuIGYgPSBiLnR5cGUsIGUgPSBiLnJlcXVlc3QsIGcgPSBiLnVybCwgSShnKSA/IHZvaWQgMCA6IGoucnVubmluZyB8fCBELnJlc3RhcnRPblJlcXVlc3RBZnRlciA9PT0gITEgJiYgXCJmb3JjZVwiICE9PSBKKGYpID8gdm9pZCAwIDogKGQgPSBhcmd1bWVudHMsIGMgPSBELnJlc3RhcnRPblJlcXVlc3RBZnRlciB8fCAwLCBcImJvb2xlYW5cIiA9PSB0eXBlb2YgYyAmJiAoYyA9IDApLCBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGIsIGMsIGcsIGgsIGksIGs7aWYgKGIgPSBcInNvY2tldFwiID09PSBmID8gZS5yZWFkeVN0YXRlIDwgMiA6IDAgPCAoaCA9IGUucmVhZHlTdGF0ZSkgJiYgNCA+IGgpIHtcbiAgICAgICAgICBmb3IgKGoucmVzdGFydCgpLCBpID0gai5zb3VyY2VzLCBrID0gW10sIGMgPSAwLCBnID0gaS5sZW5ndGg7IGcgPiBjOyBjKyspIHtcbiAgICAgICAgICAgIGlmIChLID0gaVtjXSwgSyBpbnN0YW5jZW9mIGEpIHtcbiAgICAgICAgICAgICAgSy53YXRjaC5hcHBseShLLCBkKTticmVhaztcbiAgICAgICAgICAgIH1rLnB1c2godm9pZCAwKTtcbiAgICAgICAgICB9cmV0dXJuIGs7XG4gICAgICAgIH1cbiAgICAgIH0sIGMpKTtcbiAgICB9KSwgYSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGZ1bmN0aW9uIGEoKSB7XG4gICAgICAgIHZhciBhID0gdGhpczt0aGlzLmVsZW1lbnRzID0gW10sIHkoKS5vbihcInJlcXVlc3RcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBhLndhdGNoLmFwcGx5KGEsIGFyZ3VtZW50cyk7XG4gICAgICAgIH0pO1xuICAgICAgfXJldHVybiBhLnByb3RvdHlwZS53YXRjaCA9IGZ1bmN0aW9uIChhKSB7XG4gICAgICAgIHZhciBiLCBjLCBkLCBlO3JldHVybiBkID0gYS50eXBlLCBiID0gYS5yZXF1ZXN0LCBlID0gYS51cmwsIEkoZSkgPyB2b2lkIDAgOiAoYyA9IFwic29ja2V0XCIgPT09IGQgPyBuZXcgbihiKSA6IG5ldyBvKGIpLCB0aGlzLmVsZW1lbnRzLnB1c2goYykpO1xuICAgICAgfSwgYTtcbiAgICB9KCksIG8gPSBmdW5jdGlvbiAoKSB7XG4gICAgICBmdW5jdGlvbiBhKGEpIHtcbiAgICAgICAgdmFyIGIsXG4gICAgICAgICAgICBjLFxuICAgICAgICAgICAgZCxcbiAgICAgICAgICAgIGUsXG4gICAgICAgICAgICBmLFxuICAgICAgICAgICAgZyxcbiAgICAgICAgICAgIGggPSB0aGlzO2lmICh0aGlzLnByb2dyZXNzID0gMCwgbnVsbCAhPSB3aW5kb3cuUHJvZ3Jlc3NFdmVudCkgZm9yIChjID0gbnVsbCwgYS5hZGRFdmVudExpc3RlbmVyKFwicHJvZ3Jlc3NcIiwgZnVuY3Rpb24gKGEpIHtcbiAgICAgICAgICByZXR1cm4gaC5wcm9ncmVzcyA9IGEubGVuZ3RoQ29tcHV0YWJsZSA/IDEwMCAqIGEubG9hZGVkIC8gYS50b3RhbCA6IGgucHJvZ3Jlc3MgKyAoMTAwIC0gaC5wcm9ncmVzcykgLyAyO1xuICAgICAgICB9LCAhMSksIGcgPSBbXCJsb2FkXCIsIFwiYWJvcnRcIiwgXCJ0aW1lb3V0XCIsIFwiZXJyb3JcIl0sIGQgPSAwLCBlID0gZy5sZW5ndGg7IGUgPiBkOyBkKyspIHtcbiAgICAgICAgICBiID0gZ1tkXSwgYS5hZGRFdmVudExpc3RlbmVyKGIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBoLnByb2dyZXNzID0gMTAwO1xuICAgICAgICAgIH0sICExKTtcbiAgICAgICAgfSBlbHNlIGYgPSBhLm9ucmVhZHlzdGF0ZWNoYW5nZSwgYS5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIGI7cmV0dXJuIDAgPT09IChiID0gYS5yZWFkeVN0YXRlKSB8fCA0ID09PSBiID8gaC5wcm9ncmVzcyA9IDEwMCA6IDMgPT09IGEucmVhZHlTdGF0ZSAmJiAoaC5wcm9ncmVzcyA9IDUwKSwgXCJmdW5jdGlvblwiID09IHR5cGVvZiBmID8gZi5hcHBseShudWxsLCBhcmd1bWVudHMpIDogdm9pZCAwO1xuICAgICAgICB9O1xuICAgICAgfXJldHVybiBhO1xuICAgIH0oKSwgbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGZ1bmN0aW9uIGEoYSkge1xuICAgICAgICB2YXIgYixcbiAgICAgICAgICAgIGMsXG4gICAgICAgICAgICBkLFxuICAgICAgICAgICAgZSxcbiAgICAgICAgICAgIGYgPSB0aGlzO2ZvciAodGhpcy5wcm9ncmVzcyA9IDAsIGUgPSBbXCJlcnJvclwiLCBcIm9wZW5cIl0sIGMgPSAwLCBkID0gZS5sZW5ndGg7IGQgPiBjOyBjKyspIHtcbiAgICAgICAgICBiID0gZVtjXSwgYS5hZGRFdmVudExpc3RlbmVyKGIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBmLnByb2dyZXNzID0gMTAwO1xuICAgICAgICAgIH0sICExKTtcbiAgICAgICAgfVxuICAgICAgfXJldHVybiBhO1xuICAgIH0oKSwgZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGZ1bmN0aW9uIGEoYSkge1xuICAgICAgICB2YXIgYiwgYywgZCwgZjtmb3IgKG51bGwgPT0gYSAmJiAoYSA9IHt9KSwgdGhpcy5lbGVtZW50cyA9IFtdLCBudWxsID09IGEuc2VsZWN0b3JzICYmIChhLnNlbGVjdG9ycyA9IFtdKSwgZiA9IGEuc2VsZWN0b3JzLCBjID0gMCwgZCA9IGYubGVuZ3RoOyBkID4gYzsgYysrKSB7XG4gICAgICAgICAgYiA9IGZbY10sIHRoaXMuZWxlbWVudHMucHVzaChuZXcgZShiKSk7XG4gICAgICAgIH1cbiAgICAgIH1yZXR1cm4gYTtcbiAgICB9KCksIGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBmdW5jdGlvbiBhKGEpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RvciA9IGEsIHRoaXMucHJvZ3Jlc3MgPSAwLCB0aGlzLmNoZWNrKCk7XG4gICAgICB9cmV0dXJuIGEucHJvdG90eXBlLmNoZWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYSA9IHRoaXM7cmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5zZWxlY3RvcikgPyB0aGlzLmRvbmUoKSA6IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBhLmNoZWNrKCk7XG4gICAgICAgIH0sIEQuZWxlbWVudHMuY2hlY2tJbnRlcnZhbCk7XG4gICAgICB9LCBhLnByb3RvdHlwZS5kb25lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9ncmVzcyA9IDEwMDtcbiAgICAgIH0sIGE7XG4gICAgfSgpLCBjID0gZnVuY3Rpb24gKCkge1xuICAgICAgZnVuY3Rpb24gYSgpIHtcbiAgICAgICAgdmFyIGEsXG4gICAgICAgICAgICBiLFxuICAgICAgICAgICAgYyA9IHRoaXM7dGhpcy5wcm9ncmVzcyA9IG51bGwgIT0gKGIgPSB0aGlzLnN0YXRlc1tkb2N1bWVudC5yZWFkeVN0YXRlXSkgPyBiIDogMTAwLCBhID0gZG9jdW1lbnQub25yZWFkeXN0YXRlY2hhbmdlLCBkb2N1bWVudC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGwgIT0gYy5zdGF0ZXNbZG9jdW1lbnQucmVhZHlTdGF0ZV0gJiYgKGMucHJvZ3Jlc3MgPSBjLnN0YXRlc1tkb2N1bWVudC5yZWFkeVN0YXRlXSksIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgYSA/IGEuYXBwbHkobnVsbCwgYXJndW1lbnRzKSA6IHZvaWQgMDtcbiAgICAgICAgfTtcbiAgICAgIH1yZXR1cm4gYS5wcm90b3R5cGUuc3RhdGVzID0geyBsb2FkaW5nOiAwLCBpbnRlcmFjdGl2ZTogNTAsIGNvbXBsZXRlOiAxMDAgfSwgYTtcbiAgICB9KCksIGYgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBmdW5jdGlvbiBhKCkge1xuICAgICAgICB2YXIgYSxcbiAgICAgICAgICAgIGIsXG4gICAgICAgICAgICBjLFxuICAgICAgICAgICAgZCxcbiAgICAgICAgICAgIGUsXG4gICAgICAgICAgICBmID0gdGhpczt0aGlzLnByb2dyZXNzID0gMCwgYSA9IDAsIGUgPSBbXSwgZCA9IDAsIGMgPSBDKCksIGIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIGc7cmV0dXJuIGcgPSBDKCkgLSBjIC0gNTAsIGMgPSBDKCksIGUucHVzaChnKSwgZS5sZW5ndGggPiBELmV2ZW50TGFnLnNhbXBsZUNvdW50ICYmIGUuc2hpZnQoKSwgYSA9IHEoZSksICsrZCA+PSBELmV2ZW50TGFnLm1pblNhbXBsZXMgJiYgYSA8IEQuZXZlbnRMYWcubGFnVGhyZXNob2xkID8gKGYucHJvZ3Jlc3MgPSAxMDAsIGNsZWFySW50ZXJ2YWwoYikpIDogZi5wcm9ncmVzcyA9IDEwMCAqICgzIC8gKGEgKyAzKSk7XG4gICAgICAgIH0sIDUwKTtcbiAgICAgIH1yZXR1cm4gYTtcbiAgICB9KCksIG0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICBmdW5jdGlvbiBhKGEpIHtcbiAgICAgICAgdGhpcy5zb3VyY2UgPSBhLCB0aGlzLmxhc3QgPSB0aGlzLnNpbmNlTGFzdFVwZGF0ZSA9IDAsIHRoaXMucmF0ZSA9IEQuaW5pdGlhbFJhdGUsIHRoaXMuY2F0Y2h1cCA9IDAsIHRoaXMucHJvZ3Jlc3MgPSB0aGlzLmxhc3RQcm9ncmVzcyA9IDAsIG51bGwgIT0gdGhpcy5zb3VyY2UgJiYgKHRoaXMucHJvZ3Jlc3MgPSBGKHRoaXMuc291cmNlLCBcInByb2dyZXNzXCIpKTtcbiAgICAgIH1yZXR1cm4gYS5wcm90b3R5cGUudGljayA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIHZhciBjO3JldHVybiBudWxsID09IGIgJiYgKGIgPSBGKHRoaXMuc291cmNlLCBcInByb2dyZXNzXCIpKSwgYiA+PSAxMDAgJiYgKHRoaXMuZG9uZSA9ICEwKSwgYiA9PT0gdGhpcy5sYXN0ID8gdGhpcy5zaW5jZUxhc3RVcGRhdGUgKz0gYSA6ICh0aGlzLnNpbmNlTGFzdFVwZGF0ZSAmJiAodGhpcy5yYXRlID0gKGIgLSB0aGlzLmxhc3QpIC8gdGhpcy5zaW5jZUxhc3RVcGRhdGUpLCB0aGlzLmNhdGNodXAgPSAoYiAtIHRoaXMucHJvZ3Jlc3MpIC8gRC5jYXRjaHVwVGltZSwgdGhpcy5zaW5jZUxhc3RVcGRhdGUgPSAwLCB0aGlzLmxhc3QgPSBiKSwgYiA+IHRoaXMucHJvZ3Jlc3MgJiYgKHRoaXMucHJvZ3Jlc3MgKz0gdGhpcy5jYXRjaHVwICogYSksIGMgPSAxIC0gTWF0aC5wb3codGhpcy5wcm9ncmVzcyAvIDEwMCwgRC5lYXNlRmFjdG9yKSwgdGhpcy5wcm9ncmVzcyArPSBjICogdGhpcy5yYXRlICogYSwgdGhpcy5wcm9ncmVzcyA9IE1hdGgubWluKHRoaXMubGFzdFByb2dyZXNzICsgRC5tYXhQcm9ncmVzc1BlckZyYW1lLCB0aGlzLnByb2dyZXNzKSwgdGhpcy5wcm9ncmVzcyA9IE1hdGgubWF4KDAsIHRoaXMucHJvZ3Jlc3MpLCB0aGlzLnByb2dyZXNzID0gTWF0aC5taW4oMTAwLCB0aGlzLnByb2dyZXNzKSwgdGhpcy5sYXN0UHJvZ3Jlc3MgPSB0aGlzLnByb2dyZXNzLCB0aGlzLnByb2dyZXNzO1xuICAgICAgfSwgYTtcbiAgICB9KCksIEwgPSBudWxsLCBIID0gbnVsbCwgciA9IG51bGwsIE0gPSBudWxsLCBwID0gbnVsbCwgcyA9IG51bGwsIGoucnVubmluZyA9ICExLCB6ID0gZnVuY3Rpb24geigpIHtcbiAgICAgIHJldHVybiBELnJlc3RhcnRPblB1c2hTdGF0ZSA/IGoucmVzdGFydCgpIDogdm9pZCAwO1xuICAgIH0sIG51bGwgIT0gd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlICYmIChUID0gd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlLCB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4geigpLCBULmFwcGx5KHdpbmRvdy5oaXN0b3J5LCBhcmd1bWVudHMpO1xuICAgIH0pLCBudWxsICE9IHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSAmJiAoVyA9IHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSwgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHooKSwgVy5hcHBseSh3aW5kb3cuaGlzdG9yeSwgYXJndW1lbnRzKTtcbiAgICB9KSwgbCA9IHsgYWpheDogYSwgZWxlbWVudHM6IGQsIGRvY3VtZW50OiBjLCBldmVudExhZzogZiB9LCAoQiA9IGZ1bmN0aW9uIEIoKSB7XG4gICAgICB2YXIgYSwgYywgZCwgZSwgZiwgZywgaCwgaTtmb3IgKGouc291cmNlcyA9IEwgPSBbXSwgZyA9IFtcImFqYXhcIiwgXCJlbGVtZW50c1wiLCBcImRvY3VtZW50XCIsIFwiZXZlbnRMYWdcIl0sIGMgPSAwLCBlID0gZy5sZW5ndGg7IGUgPiBjOyBjKyspIHtcbiAgICAgICAgYSA9IGdbY10sIERbYV0gIT09ICExICYmIEwucHVzaChuZXcgbFthXShEW2FdKSk7XG4gICAgICB9Zm9yIChpID0gbnVsbCAhPSAoaCA9IEQuZXh0cmFTb3VyY2VzKSA/IGggOiBbXSwgZCA9IDAsIGYgPSBpLmxlbmd0aDsgZiA+IGQ7IGQrKykge1xuICAgICAgICBLID0gaVtkXSwgTC5wdXNoKG5ldyBLKEQpKTtcbiAgICAgIH1yZXR1cm4gai5iYXIgPSByID0gbmV3IGIoKSwgSCA9IFtdLCBNID0gbmV3IG0oKTtcbiAgICB9KSgpLCBqLnN0b3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gai50cmlnZ2VyKFwic3RvcFwiKSwgai5ydW5uaW5nID0gITEsIHIuZGVzdHJveSgpLCBzID0gITAsIG51bGwgIT0gcCAmJiAoXCJmdW5jdGlvblwiID09IHR5cGVvZiB0ICYmIHQocCksIHAgPSBudWxsKSwgQigpO1xuICAgIH0sIGoucmVzdGFydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBqLnRyaWdnZXIoXCJyZXN0YXJ0XCIpLCBqLnN0b3AoKSwgai5zdGFydCgpO1xuICAgIH0sIGouZ28gPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgYTtyZXR1cm4gai5ydW5uaW5nID0gITAsIHIucmVuZGVyKCksIGEgPSBDKCksIHMgPSAhMSwgcCA9IEcoZnVuY3Rpb24gKGIsIGMpIHtcbiAgICAgICAgdmFyIGQsIGUsIGYsIGcsIGgsIGksIGssIGwsIG4sIG8sIHAsIHEsIHQsIHUsIHYsIHc7Zm9yIChsID0gMTAwIC0gci5wcm9ncmVzcywgZSA9IHAgPSAwLCBmID0gITAsIGkgPSBxID0gMCwgdSA9IEwubGVuZ3RoOyB1ID4gcTsgaSA9ICsrcSkge1xuICAgICAgICAgIGZvciAoSyA9IExbaV0sIG8gPSBudWxsICE9IEhbaV0gPyBIW2ldIDogSFtpXSA9IFtdLCBoID0gbnVsbCAhPSAodyA9IEsuZWxlbWVudHMpID8gdyA6IFtLXSwgayA9IHQgPSAwLCB2ID0gaC5sZW5ndGg7IHYgPiB0OyBrID0gKyt0KSB7XG4gICAgICAgICAgICBnID0gaFtrXSwgbiA9IG51bGwgIT0gb1trXSA/IG9ba10gOiBvW2tdID0gbmV3IG0oZyksIGYgJj0gbi5kb25lLCBuLmRvbmUgfHwgKGUrKywgcCArPSBuLnRpY2soYikpO1xuICAgICAgICAgIH1cbiAgICAgICAgfXJldHVybiBkID0gcCAvIGUsIHIudXBkYXRlKE0udGljayhiLCBkKSksIHIuZG9uZSgpIHx8IGYgfHwgcyA/IChyLnVwZGF0ZSgxMDApLCBqLnRyaWdnZXIoXCJkb25lXCIpLCBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gci5maW5pc2goKSwgai5ydW5uaW5nID0gITEsIGoudHJpZ2dlcihcImhpZGVcIik7XG4gICAgICAgIH0sIE1hdGgubWF4KEQuZ2hvc3RUaW1lLCBNYXRoLm1heChELm1pblRpbWUgLSAoQygpIC0gYSksIDApKSkpIDogYygpO1xuICAgICAgfSk7XG4gICAgfSwgai5zdGFydCA9IGZ1bmN0aW9uIChhKSB7XG4gICAgICBfdihELCBhKSwgai5ydW5uaW5nID0gITA7dHJ5IHtcbiAgICAgICAgci5yZW5kZXIoKTtcbiAgICAgIH0gY2F0Y2ggKGIpIHtcbiAgICAgICAgaSA9IGI7XG4gICAgICB9cmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGFjZVwiKSA/IChqLnRyaWdnZXIoXCJzdGFydFwiKSwgai5nbygpKSA6IHNldFRpbWVvdXQoai5zdGFydCwgNTApO1xuICAgIH0sIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgZGVmaW5lICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoW1wicGFjZVwiXSwgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGo7XG4gICAgfSkgOiBcIm9iamVjdFwiID09ICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKGV4cG9ydHMpKSA/IG1vZHVsZS5leHBvcnRzID0gaiA6IEQuc3RhcnRPblBhZ2VMb2FkICYmIGouc3RhcnQoKTtcbiAgfSkuY2FsbCh0aGlzKTtcblxuICAkKCcuZGVmYXVsdC1yZXBlYXRlcl9fdGl0bGUnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgJCh0aGlzKS5wYXJlbnQoKS50b2dnbGVDbGFzcygnanMtcmVwZWF0ZXItaXMtb3BlbicpO1xuICB9KTtcblxuICAkKCcudGVhc2VfX2ltZycpLmxvYWQoZnVuY3Rpb24gKCkge1xuICAgIHZhciBpbWdTcmMgPSAkKHRoaXMpLmF0dHIoJ3NyYycpO1xuICAgIC8vIGRlYnVnZ2VyO1xuICAgICQodGhpcykucGFyZW50KCkuY3NzKHtcbiAgICAgICdiYWNrZ3JvdW5kLWltYWdlJzogJ3VybChcIicgKyBpbWdTcmMgKyAnXCIpJ1xuICAgIH0pLmFkZENsYXNzKCd0ZWFzZV9faW1nLWxvYWRlZCcpO1xuICB9KS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5jb21wbGV0ZSkgJCh0aGlzKS5sb2FkKCk7XG4gIH0pO1xuXG4gICQoJy5wcmltYXJ5LXNlYXJjaC1pbnB1dCcpLm9uKCdmb2N1cycsIGZ1bmN0aW9uICgpIHtcbiAgICAkKHRoaXMpLnBhcmVudCgpLmFkZENsYXNzKCdqcy1zZWFyY2gtaXMtYWN0aXZlJyk7XG4gIH0pLm9uKCdibHVyJywgZnVuY3Rpb24gKCkge1xuICAgICQodGhpcykucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2pzLXNlYXJjaC1pcy1hY3RpdmUnKTtcbiAgfSk7XG5cbiAgLy8gbmF2IHN0dWZmXG5cbiAgdmFyIHdXaWR0aCA9ICQod2luZG93KS53aWR0aCgpO1xuXG4gICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24gKCkge1xuICAgIHdXaWR0aCA9ICQod2luZG93KS53aWR0aCgpO1xuXG4gICAgY29uc29sZS5sb2cod1dpZHRoKTtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gY2xvc2VOYXYoKSB7XG4gICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdqcy1uYXYtYWN0aXZlJyk7XG4gICAgJCgnLmhpZGRlbi1uYXYnKS5zY3JvbGxUb3AoMCk7XG4gIH1cblxuICBmdW5jdGlvbiBvcGVuTmF2KCkge1xuICAgICQoJ2JvZHknKS5hZGRDbGFzcygnanMtbmF2LWFjdGl2ZScpO1xuICB9XG5cbiAgJCgnLm5hdl9fdHJpZ2dlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoJCgnYm9keScpLmhhc0NsYXNzKCdqcy1uYXYtYWN0aXZlJykpIHtcbiAgICAgIGNsb3NlTmF2KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9wZW5OYXYoKTtcbiAgICB9XG4gIH0pO1xuXG4gIGlmICh3V2lkdGggPD0gNzY4KSB7XG4gICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBoYXNTY3JvbGxlZCA9IGZ1bmN0aW9uIGhhc1Njcm9sbGVkKCkge1xuICAgICAgICAvLyBkZWJ1Z2dlclxuICAgICAgICB2YXIgc3QgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG5cbiAgICAgICAgLy8gTWFrZSBzdXJlIHRoZXkgc2Nyb2xsIG1vcmUgdGhhbiBkZWx0YVxuICAgICAgICBpZiAoTWF0aC5hYnMobGFzdFNjcm9sbFRvcCAtIHN0KSA8PSBkZWx0YSkgcmV0dXJuO1xuXG4gICAgICAgIC8vIElmIHRoZXkgc2Nyb2xsZWQgZG93biBhbmQgYXJlIHBhc3QgdGhlIG5hdmJhciwgYWRkIGNsYXNzIC5uYXYtdXAuXG4gICAgICAgIC8vIFRoaXMgaXMgbmVjZXNzYXJ5IHNvIHlvdSBuZXZlciBzZWUgd2hhdCBpcyBcImJlaGluZFwiIHRoZSBuYXZiYXIuXG4gICAgICAgIGlmIChzdCA+IGxhc3RTY3JvbGxUb3AgJiYgc3QgPiBuYXZiYXJIZWlnaHQpIHtcbiAgICAgICAgICAvLyBTY3JvbGwgRG93blxuICAgICAgICAgICRuYXYucmVtb3ZlQ2xhc3MoJ25hdi1kb3duJykuYWRkQ2xhc3MoJ25hdi11cCcpO1xuICAgICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnanMtbmF2LWFjdGl2ZScpO1xuICAgICAgICAgIGNsb3NlTmF2KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gU2Nyb2xsIFVwXG4gICAgICAgICAgaWYgKHN0ICsgJCh3aW5kb3cpLmhlaWdodCgpIDwgJChkb2N1bWVudCkuaGVpZ2h0KCkpIHtcbiAgICAgICAgICAgICRuYXYucmVtb3ZlQ2xhc3MoJ25hdi11cCcpLmFkZENsYXNzKCduYXYtZG93bicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxhc3RTY3JvbGxUb3AgPSBzdDtcbiAgICAgIH07XG5cbiAgICAgIC8vIEhpZGUgSGVhZGVyIG9uIG9uIHNjcm9sbCBkb3duXG4gICAgICB2YXIgZGlkU2Nyb2xsID0gdm9pZCAwO1xuICAgICAgdmFyIGxhc3RTY3JvbGxUb3AgPSAwO1xuICAgICAgdmFyIGRlbHRhID0gNTtcbiAgICAgIHZhciAkbmF2ID0gJCgnLm5hdicpO1xuICAgICAgdmFyIG5hdmJhckhlaWdodCA9ICRuYXYub3V0ZXJIZWlnaHQoKTtcbiAgICAgIGNvbnNvbGUubG9nKCdzaXplIGlzIHJpZ2h0Jyk7XG4gICAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBkaWRTY3JvbGwgPSB0cnVlO1xuICAgICAgfSk7XG5cbiAgICAgIHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGRpZFNjcm9sbCkge1xuICAgICAgICAgIGhhc1Njcm9sbGVkKCk7XG4gICAgICAgICAgZGlkU2Nyb2xsID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0sIDEwMCk7XG4gICAgfSkoKTtcbiAgfSBlbHNlIHtcbiAgICBjbG9zZU5hdigpO1xuICB9XG5cbiAgLy8gZ2V0IHdlbGNvbWUgZW1wbG95ZWUgY29udGVudCBmb3IgbmF2IGZyb21cbiAgLy8gaW5zdGFncmFtIGZlZWQgc3BlY2lmaWVkIGluIG9wdGlvbnNcbiAgZnVuY3Rpb24gZ2V0SW5zdGFncmFtTmF2Q29udGVudCgpIHtcbiAgICB2YXIgaW50ZXJ2YWxEdXJhdGlvbiA9IDUwO1xuICAgIHZhciBpbnRlcnZhbFRvdGFsVGltZSA9IDA7XG5cbiAgICB2YXIgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBrZWVwIHRyYWNrIG9mIHRvdGFsIHRpbWUgc3BlbnRcbiAgICAgIGludGVydmFsVG90YWxUaW1lID0gaW50ZXJ2YWxUb3RhbFRpbWUgKyBpbnRlcnZhbER1cmF0aW9uO1xuXG4gICAgICAvLyBjaGVjayB0byBzZWUgaWYgaW5zdGFncmFtIGNvbnRlbnQgaXMgb24gdGhlIHBhZ2VcbiAgICAgIGlmICgkKCcubmF2IC5zYmlfY2FwdGlvbicpLmxlbmd0aCkge1xuICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcblxuICAgICAgICAvLyBnZXQgdGV4dCBmcm9tIGNhcHRpb24gYW5kIHJlbW92ZSBcIiN3ZWxjb21lXCJcbiAgICAgICAgdmFyIG5ld1RleHQgPSBcIldlbGNvbWUgXCIgKyAkKCcubmF2IC5zYmlfY2FwdGlvbicpLnRleHQoKS5yZXBsYWNlKCcjd2VsY29tZScsICcnKSArIFwiLCBvdXIgbmV3ZXN0IGVtcGxveWVlIVwiO1xuICAgICAgICAvLyBjYWNoZSBuZXdUZXh0IHZhcmlhYmxlXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdlbXBsb3llZVRleHQnLCBuZXdUZXh0KTtcbiAgICAgICAgLy8gYWRkIG5ld1RleHQgdG8gbmF2XG4gICAgICAgICQoJy5uYXYtZW1wbG95ZWUnKS50ZXh0KG5ld1RleHQpO1xuICAgICAgICAvLyByZW1vdmUgaW5zdGFncmFtIGZlZWQgZnJvbSBuYXZcbiAgICAgICAgJCgnLm5hdiAjc2JfaW5zdGFncmFtJykucmVtb3ZlKCk7XG4gICAgICB9IGVsc2UgaWYgKGludGVydmFsVG90YWxUaW1lID09PSA1MDAwKSB7XG4gICAgICAgIC8vIGtpbGwgaW50ZXJ2YWwgYW5kIHJlbW92ZSBmZWVkIGlmIGl0IHRha2VzIG1vcmUgdGhhbiA1IHNlY29uZHNcbiAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICQoJy5uYXYgI3NiX2luc3RhZ3JhbScpLnJlbW92ZSgpO1xuICAgICAgfVxuICAgIH0sIGludGVydmFsRHVyYXRpb24pO1xuICB9XG5cbiAgLy8gR2V0IGVtcGxveWVlIHRleHQsIGVpdGhlciBmcm9tIGxvY2FsIHN0b3JhZ2Ugb3IgaW5zdGFncmFtXG4gIHZhciBsYXN0VXBkYXRlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xhc3RVcGRhdGUnKTtcbiAgdmFyIG5vdyA9IG1vbWVudCgpO1xuICB2YXIgbGFzdCA9IG1vbWVudC51bml4KGxhc3RVcGRhdGUpO1xuICB2YXIgdGltZVNpbmNlTGFzdFVwZGF0ZSA9IG5vdy5kaWZmKGxhc3QsICdtaW51dGVzJyk7XG5cbiAgaWYgKHRpbWVTaW5jZUxhc3RVcGRhdGUgPCA2MCAmJiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZW1wbG95ZWVUZXh0JykubGVuZ3RoKSB7XG4gICAgLy8gdXNlIGNhY2hlXG4gICAgJCgnLm5hdi1lbXBsb3llZScpLnRleHQobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2VtcGxveWVlVGV4dCcpKTtcbiAgICAkKCcubmF2ICNzYl9pbnN0YWdyYW0nKS5yZW1vdmUoKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBnZXQgZnJlc2ggZGF0YVxuICAgIGdldEluc3RhZ3JhbU5hdkNvbnRlbnQoKTtcbiAgICBjb25zb2xlLmxvZygnZ2V0dGluZyBmcmVzaCBkYXRhJyk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xhc3RVcGRhdGUnLCBtb21lbnQoKS51bml4KCkpO1xuICB9XG5cbiAgcXVpY2tTaGFyZSgpO1xufSk7XG5cbn0se31dfSx7fSxbMV0pO1xuIl0sImZpbGUiOiJzaXRlLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
