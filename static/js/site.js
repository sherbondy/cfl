'use strict';

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

  $('.primary-search-input').on('focus', function () {
    $(this).parent().addClass('js-search-is-active');
  }).on('blur', function () {
    $(this).parent().removeClass('js-search-is-active');
  });

  quickShare();
});