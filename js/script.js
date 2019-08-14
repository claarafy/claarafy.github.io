(function($) {
    "use strict";

    /* ==========================================================================
       When document is ready, do
       ========================================================================== */
        $(document).on('ready', function() {
            registerScrollToTop();
            onePageNav();
            toggleClassForSmallNav();
            smallNavFunctionality();

        });

    /* ==========================================================================
       When document is Scrollig, do
       ========================================================================== */
        $(window).on('scroll', function() {
        });

    /* ==========================================================================
       When document is loading, do
       ========================================================================== */
        $(window).on('load', function() {
            toggleMobileNavigation();

        });

    /* ==========================================================================
       When Window is resizing, do
       ========================================================================== */
         $(window).on("resize", function() {
            toggleClassForSmallNav();
            clearTimeout($.data(this, 'resizeTimer'));

            $.data(this, 'resizeTimer', setTimeout(function() {
                smallNavFunctionality();
            }, 200));
        });

   /*------------------------------------------
        = FUNCTIONS
    -------------------------------------------*/



    // Parallax background
    function bgParallax() {
        if ($(".parallax").length) {
            $(".parallax").each(function() {
                var height = $(this).position().top;
                var resize     = height - $(window).scrollTop();
                var parallaxSpeed = $(this).data("speed");
                var doParallax = -(resize / parallaxSpeed);
                var positionValue   = doParallax + "px";
                //var img = $(this).data("bg-image");

                $(this).css({
                    //backgroundImage: "url(" + img + ")",
                    backgroundPosition: "50%" + positionValue,
                    backgroundSize: "cover"
                });

                if ( window.innerWidth < 768) {
                    $(this).css({
                        backgroundPosition: "center center"
                    });
                }

            });
        }
    }

    // Toggle mobile navigation
    function toggleMobileNavigation() {
        var navbar = $(".navigation-holder");
        var openBtn = $(".navbar-header .open-btn");
        var closeBtn = $(".navigation-holder .close-navbar");
        var navLinks = $("#navbar > ul > li > a[href^='#']");

        openBtn.on("click", function() {
            if (!navbar.hasClass("slideInn")) {
                navbar.addClass("slideInn");
            }
            return false;
        })

        closeBtn.on("click", function() {
            if (navbar.hasClass("slideInn")) {
                navbar.removeClass("slideInn");
            }
            return false;
        })

        navLinks.on("click", function() {
            if (navbar.hasClass("slideInn")) {
                navbar.removeClass("slideInn");
            }
            return false;
        })
    }

    // Function for toggle a class for small menu
    function toggleClassForSmallNav() {
        var windowWidth = window.innerWidth;
        var mainNav = $("#navbar > ul");

        if (windowWidth <= 991) {
            mainNav.addClass("small-nav");
        } else {
            mainNav.removeClass("small-nav");
        }
    }

    // Function for small menu
    function smallNavFunctionality() {
        var windowWidth = window.innerWidth;
        var mainNav = $(".navigation-holder");
        var smallNav = $(".navigation-holder > .small-nav");
        var subMenu = smallNav.find(".sub-menu");
        var megamenu = smallNav.find(".mega-menu");
        var menuItemWidthSubMenu = smallNav.find(".menu-item-has-children > a");

        if (windowWidth <= 991) {
            subMenu.hide();
            megamenu.hide();
            menuItemWidthSubMenu.on("click", function(e) {
                var $this = $(this);
                $this.siblings().slideToggle();
                e.preventDefault();
                e.stopImmediatePropagation();
            })
        } else if (windowWidth > 991) {
            mainNav.find(".sub-menu").show();
            mainNav.find(".mega-menu").show();
        }
    }

    // smooth-scrolling
    function smoothScrolling($scrollLinks, $topOffset) {
        var links = $scrollLinks;
        var topGap = $topOffset;

        links.on("click", function() {
            if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $("[name=" + this.hash.slice(1) +"]");
                if (target.length) {
                    $("html, body").animate({
                    scrollTop: target.offset().top - topGap
                }, 1000, "easeInOutExpo");
                    return false;
                }
            }
            return false;
        });
    }

    /*------------------------------------------
        = ONE PAGE NAV
    -------------------------------------------*/
    function onePageNav() {
      if($('.site-header .sticky-menu').length){
        $('.site-header .sticky-menu ul').onePageNav({
        });
      }
    }

    /*------------------------------------------
        = SCROLL TO TOP
    -------------------------------------------*/
    function registerScrollToTop() {
        $(window).scroll(function(){
            if ($(this).scrollTop() > 600) {
                $('.scrollToTop').fadeIn();
            } else {
                $('.scrollToTop').fadeOut();
            }
        });

        scrollToTop();

        $('.scrollToTop').click(scrollToTop);
        $('.footer-link').click(scrollToTop);
    }

    function scrollToTop(){
        $('html, body').animate({scrollTop : 0},1000);
        return false;
    }

    /*------------------------------------------
           = COUNTDOWN CLOCK
       -------------------------------------------*/

       var finalDate = '';
       var finalDate = '2019/11/17';

       if ($("#clock").length) {
           $('#clock').countdown(finalDate, startCountdown)
             .on('finish.countdown', endCountdown)


           function startCountdown(event) {
             $('#clock #days-val').html(event.strftime('<div class="box">%D</div>'));
             $('#clock #hours-val').html(event.strftime('<div class="box">%H</div>'));
             $('#clock #mins-val').html(event.strftime('<div class="box">%M</div>'));
             $('#clock #secs-val').html(event.strftime('<div class="box">%S</div>'));
           }

           function endCountdown() {
             $('#countdown-text').hide();
             $('#dday-text').show();
           }

       }

       /*------------------------------------------
           = RSVP FORM SUBMISSION
       -------------------------------------------*/
       if ($("#rsvp-form").length) {
           $("#rsvp-form").validate({
               rules: {
                   name: {
                       required: true,
                       minlength: 2
                   },
                   email: {
                       required: true
                   },

                   guest: {
                       required: true
                   },

                   events: {
                       required: true
                   }

               },

               messages: {
                   name: "Please enter your name",
                   email: "Please enter your email",
                   guest: "Please select your number of guests",
                   events: "Please let us know if you're attending"
               },

               submitHandler: function (form) {
                   $("#loader").css("display", "inline-block");
                   $.ajax({
                       type: "POST",
                       url: "mail.php",
                       data: $(form).serialize(),
                       success: function () {
                         successHandler(form);
                       },
                       error: function() {
                         errorHandler();
                       }
                   });
                   return false;
               }


           });

           function successHandler(form) {
             $( "#loader").hide();
             $( "#success").slideDown( "slow" );
             setTimeout(function() {
             $( "#success").slideUp( "slow" );
             }, 3000);
             alert("Your RSVP was successfully sent to Jesse and Megan. Thank you!")
             form.reset();
           }

           function errorHandler() {
             $( "#loader").hide();
             $( "#error").slideDown( "slow" );
             setTimeout(function() {
             $( "#error").slideUp( "slow" );
             }, 3000);
             alert("Sorry, there was an error. Please contact Jesse and Megan directly. ")
           }
       }



})(window.jQuery);
