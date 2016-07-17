jQuery( document ).ready( function( $ ) {

  $('.nav__trigger').on('click', function() {
    $('body').toggleClass('js-nav-active')
  });

  $('.default-repeater__title').on('click', function() {
    $(this).parent().toggleClass('js-repeater-is-open');
  });
});
