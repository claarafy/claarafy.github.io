(function($) {

    "use strict";



    /* ==========================================================================
       When document is ready, do
       ========================================================================== */
        $(document).on('ready', function() {
            // add your functions
            scrollToToped();
            //wowAnimation();
            onePageNav();
            toggleClassForSmallNav();
            smallNavFunctionality();
        });


    /* ==========================================================================
       When document is Scrollig, do
       ========================================================================== */
        // window on Scroll function
        $(window).on('scroll', function() {
            // add your functions
            // if ($(".site-header").length) {
            //     stickIt($(".sticky-header"), "sticky-on", $(".site-header .navigation").offset().top);
            // }
             bgParallax();
        });

    /* ==========================================================================
       When document is loading, do
       ========================================================================== */

        $(window).on('load', function() {
            // add your functions
            //preloader_load();
            toggleMobileNavigation();
            //smallNavFunctionality();
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
        // Parallax background
        function bgParallax() {
            if ($(".parallax").length) {
                $(".parallax").each(function() {
                    var height = $(this).position().top;
                    var resize     = height - $(window).scrollTop();
                    var parallaxSpeed = $(this).data("speed");
                    var doParallax = -(resize / parallaxSpeed);
                    var positionValue   = doParallax + "px";
                    var img = $(this).data("bg-image");

                    $(this).css({
                        backgroundImage: "url(" + img + ")",
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

        bgParallax();


   /*------------------------------------------
        = FUNCTIONS
    -------------------------------------------*/



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

    //toggleMobileNavigation();


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

    //toggleClassForSmallNav();

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

    //smallNavFunctionality();




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
        = STICKY HEADER
    -------------------------------------------*/
    function onePageNav() {
      if($('.site-header .sticky-menu').length){
        $('.site-header .sticky-menu ul').onePageNav({
        });
      }
    }
    // Function for clone an element for sticky menu
    function cloneNavForSticyMenu($ele, $newElmClass) {
        $ele.addClass('original').clone().insertAfter($ele).addClass($newElmClass).removeClass('original');
    }

    // clone home style 1 navigation for sticky menu
    if ($('.site-header .navigation').length) {
        //cloneNavForSticyMenu($('.site-header .navigation'), "sticky-header");
    }

    // Function for sticky menu
    function stickIt($stickyClass, $toggleClass) {
        if ($(window).scrollTop() >= 800) {
            var orgElement = $(".original");
            var coordsOrgElement = orgElement.offset();
            var leftOrgElement = coordsOrgElement.left;
            var widthOrgElement = orgElement.css("width");



            $stickyClass.addClass($toggleClass);

            $stickyClass.css({
                "width": widthOrgElement
            }).show();

            $(".original").css({
                "visibility": "hidden"
            });

        } else {

            $(".original").css({
                "visibility": "visible"
            });

            $stickyClass.removeClass($toggleClass);
        }
    }




    // ==================== Scroll To top
    function scrollToToped() {
        $(window).scroll(function(){
            if ($(this).scrollTop() > 600) {
                $('.scrollToTop').fadeIn();
            } else {
                $('.scrollToTop').fadeOut();
            }
        });

        //Click event to scroll to top
        $('.scrollToTop').click(function(){
            $('html, body').animate({scrollTop : 0},800);
            return false;
        });
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

       // ==================== Preloader
       // function preloader_load() {
       //     if($('.preloader').length){
       //         $('.preloader').delay(400).fadeOut(500);
       //     }
       // }



       // function for active menuitem
       // function activeMenuItem($links) {
       //     var top = $(window).scrollTop(),
       //         windowHeight = $(window).height(),
       //         documentHeight = $(document).height(),
       //         cur_pos = top + 2,
       //         sections = $("section"),
       //         nav = $links,
       //         nav_height = nav.outerHeight();
       //
       //
       //     sections.each(function() {
       //         var top = $(this).offset().top - nav_height,
       //             bottom = top + $(this).outerHeight();
       //
       //         if (cur_pos >= top && cur_pos <= bottom) {
       //             nav.find("> ul > li > a").parent().removeClass("current-menu-item");
       //             nav.find("a[href='#" + $(this).attr('id') + "']").parent().addClass("current-menu-item");
       //         } else if (cur_pos === 2) {
       //             nav.find("> ul > li > a").parent().removeClass("current-menu-item");
       //         }
       //
       //     });
       // }

    /*------------------------------------------
        = HIDE PRELOADER
    -------------------------------------------*/
    // function preloader() {
    //     if($('.preloader').length) {
    //         $('.preloader').delay(100).fadeOut(500, function() {
    //             //active wow
    //             wow.init();
    //         });
    //     }
    // }


    /*------------------------------------------
        = WOW ANIMATION SETTING
    -------------------------------------------*/
    // var wow = new WOW({
    //     boxClass:     'wow',      // default
    //     animateClass: 'animated', // default
    //     offset:       0,          // default
    //     mobile:       true,       // default
    //     live:         true        // default
    // });







    // ==================== Wow animation
    // function wowAnimation() {
    //     var wow = new WOW({
    //         mobile: true // trigger animations on mobile devices (default is true)
    //     });
    //     wow.init();
    // }

     //LighvtBox / Fancybox
    // if($('.lightbox-image').length) {
    //   $('.lightbox-image').fancybox();
    // }




    // ==================== fact-counter
    // $(window).scroll(startCounter);
    // function startCounter() {
    //     if ($(window).scrollTop() > 200) {
    //         $(window).off("scroll", startCounter);
    //
    //         $('.animate-numbers').each(function () {
    //             $(this).prop('Counter',0).animate({
    //                 Counter: $(this).text()
    //             }, {
    //                 duration: 5000,
    //                 easing: 'swing',
    //                 step: function (now) {
    //                     $(this).text(Math.ceil(now));
    //                 }
    //             });
    //         });
    //     }
    // }



})(window.jQuery);
