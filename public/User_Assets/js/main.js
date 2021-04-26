;
(function() {

    'use strict';

    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    var mobileMenuOutsideClick = function() {

        $(document).click(function(e) {
            var container = $("#colorlib-offcanvas, .js-colorlib-nav-toggle");
            if (!container.is(e.target) && container.has(e.target).length === 0) {

                if ($('body').hasClass('offcanvas')) {

                    $('body').removeClass('offcanvas');
                    $('.js-colorlib-nav-toggle').removeClass('active');

                }


            }
        });

    };


    var offcanvasMenu = function() {

        $('#page').prepend('<div id="colorlib-offcanvas" />');
        $('#page').prepend('<a href="#" class="js-colorlib-nav-toggle colorlib-nav-toggle colorlib-nav-white"><i></i></a>');
        var clone1 = $('.menu-1 > ul').clone();
        $('#colorlib-offcanvas').append(clone1);
        var clone2 = $('.menu-2 > ul').clone();
        $('#colorlib-offcanvas').append(clone2);

        $('#colorlib-offcanvas .has-dropdown').addClass('offcanvas-has-dropdown');
        $('#colorlib-offcanvas')
            .find('li')
            .removeClass('has-dropdown');

        // Hover dropdown menu on mobile
        $('.offcanvas-has-dropdown').mouseenter(function() {
            var $this = $(this);

            $this
                .addClass('active')
                .find('ul')
                .slideDown(500, 'easeOutExpo');
        }).mouseleave(function() {

            var $this = $(this);
            $this
                .removeClass('active')
                .find('ul')
                .slideUp(500, 'easeOutExpo');
        });


        $(window).resize(function() {

            if ($('body').hasClass('offcanvas')) {

                $('body').removeClass('offcanvas');
                $('.js-colorlib-nav-toggle').removeClass('active');

            }
        });
    };


    var burgerMenu = function() {

        $('body').on('click', '.js-colorlib-nav-toggle', function(event) {
            var $this = $(this);


            if ($('body').hasClass('overflow offcanvas')) {
                $('body').removeClass('overflow offcanvas');
            } else {
                $('body').addClass('overflow offcanvas');
            }
            $this.toggleClass('active');
            event.preventDefault();

        });
    };


    var contentWayPoint = function() {
        var i = 0;
        $('.animate-box').waypoint(function(direction) {

            if (direction === 'down' && !$(this.element).hasClass('animated-fast')) {

                i++;

                $(this.element).addClass('item-animate');
                setTimeout(function() {

                    $('body .animate-box.item-animate').each(function(k) {
                        var el = $(this);
                        setTimeout(function() {
                            var effect = el.data('animate-effect');
                            if (effect === 'fadeIn') {
                                el.addClass('fadeIn animated-fast');
                            } else if (effect === 'fadeInLeft') {
                                el.addClass('fadeInLeft animated-fast');
                            } else if (effect === 'fadeInRight') {
                                el.addClass('fadeInRight animated-fast');
                            } else {
                                el.addClass('fadeInUp animated-fast');
                            }

                            el.removeClass('item-animate');
                        }, k * 200, 'easeInOutExpo');
                    });

                }, 100);

            }

        }, { offset: '85%' });
    };


    var dropdown = function() {

        $('.has-dropdown').mouseenter(function() {

            var $this = $(this);
            $this
                .find('.dropdown')
                .css('display', 'block')
                .addClass('animated-fast fadeInUpMenu');

        }).mouseleave(function() {
            var $this = $(this);

            $this
                .find('.dropdown')
                .css('display', 'none')
                .removeClass('animated-fast fadeInUpMenu');
        });

    };


    var goToTop = function() {

        $('.js-gotop').on('click', function(event) {

            event.preventDefault();

            $('html, body').animate({
                scrollTop: $('html').offset().top
            }, 500, 'easeInOutExpo');

            return false;
        });

        $(window).scroll(function() {

            var $win = $(window);
            if ($win.scrollTop() > 200) {
                $('.js-top').addClass('active');
            } else {
                $('.js-top').removeClass('active');
            }

        });

    };


    // Loading page
    var loaderPage = function() {
        $(".colorlib-loader").fadeOut("slow");
    };


    var sliderMain = function() {

        $('#colorlib-hero .flexslider').flexslider({
            animation: "fade",
            slideshowSpeed: 5000,
            directionNav: true,
            start: function() {
                setTimeout(function() {
                    $('.slider-text').removeClass('animated fadeInUp');
                    $('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
                }, 500);
            },
            before: function() {
                setTimeout(function() {
                    $('.slider-text').removeClass('animated fadeInUp');
                    $('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
                }, 500);
            }

        });

    };

    // Owl Carousel
    var owlCrouselFeatureSlide = function() {
        var owl = $('.owl-carousel');
        owl.owlCarousel({
            loop: true,
            margin: 30,
            nav: true,
            dots: false,
            autoplay: true,
            autoplayHoverPause: true,
            smartSpeed: 500,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 3
                }
            },
            navText: [
                "<i class='icon-chevron-left owl-direction'></i>",
                "<i class='icon-chevron-right owl-direction'></i>"
            ]
        });

        var owl2 = $('.owl-carousel2');
        owl2.owlCarousel({
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            autoplay: true,
            loop: true,
            margin: 0,
            nav: true,
            dots: false,
            autoHeight: true,
            items: 1,
            navText: [
                "<i class='icon-chevron-left owl-direction'></i>",
                "<i class='icon-chevron-right owl-direction'></i>"
            ]
        });
    };

    var parallax = function() {

        if (!isMobile.any()) {
            $(window).stellar({
                horizontalScrolling: false,
                hideDistantElements: false,
                responsive: true

            });
        }
    };

    var datePicker = function() {
        // jQuery('#time').timepicker();
        jQuery('.date').datepicker({
            'format': 'm/d/yyyy',
            'autoclose': true
        });
    };


    $(function() {
        mobileMenuOutsideClick();
        offcanvasMenu();
        burgerMenu();
        contentWayPoint();
        sliderMain();
        dropdown();
        goToTop();
        loaderPage();
        owlCrouselFeatureSlide();
        parallax();
        datePicker();
    });


}());

// For changing themes
const toggleSwitch = document.querySelector(".togglebtn");

function switchTheme(event) {
  document.querySelector(".tumbler").classList.toggle("tumbler--night-mode");
  if (event.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
}
toggleSwitch.addEventListener("change", switchTheme);

const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
    document.querySelector(".tumbler").classList.add("tumbler--night-mode");
    toggleSwitch.checked = true;
  } else {
    document.querySelector(".tumbler").classList.remove("tumbler--night-mode");
  }
}

window.addEventListener("DOMContentLoaded", function () {
    // get the form elements defined in your form HTML above
  
    var form = document.getElementById("my-form");
    var name = document.getElementById("validationCustom01");
    var email = document.getElementById("validationCustom02");
    var message = document.getElementById("validationCustom03");
    // var button = document.getElementById("my-form-button");
    var status = document.getElementById("status");
    // Success and Error functions for after the form is submitted
  
    function success() {
      form.value='';
      name.value='';
      email.value='';
      message.value='';
      status.classList.add("success");
      status.innerHTML = "Thanks!";
    }
  
    function error() {
      status.classList.add("error");
      status.innerHTML = "Oops! There was a problem.";
    }
  
    // handle the form submission event
  
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var data = new FormData(form);
      ajax(form.method, form.action, data, success, error);
    });
  });
  
  // helper function for sending an AJAX request
  
  function ajax(method, url, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        success(xhr.response, xhr.responseType);
      } else {
        error(xhr.status, xhr.response, xhr.responseType);
      }
    };
    xhr.send(data);
  }
