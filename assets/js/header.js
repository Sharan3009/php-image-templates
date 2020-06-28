jQuery(document).ready(function($) {

  	"use strict";

	var siteMenuClone = function() {

		$('.js-clone-nav').each(function() {
			var $this = $(this);
			$this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
		});


		setTimeout(function() {

			var counter = 0;
      $('.site-mobile-menu .has-children').each(function(){
        var $this = $(this);

        $this.prepend('<span class="arrow-collapse collapsed">');

        $this.find('.arrow-collapse').attr({
          'data-toggle' : 'collapse',
          'data-target' : '#collapseItem' + counter,
        });

        $this.find('> ul').attr({
          'class' : 'collapse',
          'id' : 'collapseItem' + counter,
        });

        counter++;

      });

    }, 1000);

		$(window).resize(function() {
			var $this = $(this),
				w = $this.width();

			if ( w > 768 ) {
				if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
			}
		})

		$('body').on('click', '.js-menu-toggle', function(e) {
			var $this = $(this);
			e.preventDefault();

			if ( $('body').hasClass('offcanvas-menu') ) {
				$('body').removeClass('offcanvas-menu');
				$this.removeClass('active');
			} else {
				$('body').addClass('offcanvas-menu');
				$this.addClass('active');
			}
		})

		// click outisde offcanvas
		$(document).mouseup(function(e) {
	    var container = $(".site-mobile-menu");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	      if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
	    }
		});
	};
	siteMenuClone();

	var siteSticky = function() {
		$(".js-sticky-header").sticky({topSpacing:0,zIndex:2});
	};
	siteSticky();

	// navigation
  var OnePageNavigation = function() {
    var navToggler = $('.site-menu-toggle');
   	$("body").on("click", ".main-menu li a[href*='#'], .smoothscroll[href*='#'], .site-mobile-menu .site-nav-wrap li a", function(e) {
	  var hash = this.hash;
	  var hashEle = $(hash);
	  if(hashEle.length){
		e.preventDefault();
		$('html, body').animate({
			'scrollTop': $(hash).offset().top
		  }, 600, function(){
			window.location.hash = hash;
		  });
	  }

    });
  };
  OnePageNavigation();

  var onScrollSpy = function(){
	$(window).on('activate.bs.scrollspy', function (e,target) {
		if(target.relatedTarget==="#get-started"){
			$("#sticky-footer").css("transform","translateY(100%)")
		} else {
			$("#sticky-footer").css("transform","");
		}
	  })
  }
  onScrollSpy();

});
