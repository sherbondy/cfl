jQuery( document ).ready( function( $ ) {

  $('.nav__trigger').on('click', function() {
    $('body').toggleClass('js-nav-active')
  });

  $('.default-repeater__title').on('click', function() {
    $(this).parent().toggleClass('js-repeater-is-open');
  });


  $('.tease__img').load( function() {
      var imgSrc = $(this).attr('src');
      // debugger;
      $(this).parent().css({
          'background-image': 'url("' + imgSrc + '")'
      }).addClass('tease__img-loaded');

  }).each(function() {
      if(this.complete) $(this).load();
  });

  $('#comment').on('focus', function() {
      $(this).closest('.comment-form').addClass('js-comment-is-active');
  });

  $('.primary-search-input').on('focus', function() {
    $(this).parent().addClass('js-search-is-active');
  }).on('blur', function() {
    $(this).parent().removeClass('js-search-is-active');
  });

  let wWidth = $(window).width();

  $( window ).resize(function() {
    wWidth = $(window).width();

    console.log(wWidth);
  });


  if ( wWidth <= 768 ) {
    console.log(wWidth);
    var lastScrollTop = 0;
    $(window).scroll(function(event){

      var st = $(this).scrollTop();

        if (st < lastScrollTop){
          $('body').removeClass('js-hide-top-nav');
        } else {
          $('body').addClass('js-hide-top-nav');
        }

        if ($(this).scrollTop() > 100) {
          $('body').addClass('js-past-nav');
        } else {
          $('body').removeClass('js-past-nav');
        }
        lastScrollTop = st;
    });
  }

  quickShare();
});
