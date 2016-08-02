/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(2);


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	jQuery(document).ready(function ($) {
	
	    $('.nav__trigger').on('click', function () {
	        $('body').toggleClass('js-nav-active');
	    });
	
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
	
	    $('#comment').on('focus', function () {
	        $(this).closest('.comment-form').addClass('js-comment-is-active');
	    });
	});

/***/ }
/******/ ]);
//# sourceMappingURL=site.js.map