(function(){

  init_ContentScrollFx();
  init_ui();

})();


function init_ui(){
  var mySwiper = new Swiper('.diaporama', {
      speed: 800,
      spaceBetween: 100,
      effect:'fade',
      fadeEffect: {
    crossFade: true
  },
  pagination: {
    el: '.diaporama-pagination',
    type: 'bullets',
    clickable : true
  },
      loop:true,
      autoplay: {
    delay: 5000,
  },
  });

  var swiper_equipe_verbatims = new Swiper('.swiper_equipe_verbatims', {
      speed: 800,
      spaceBetween: 0,
      slidesPerView:1,
      freemode:false,
      navigation: {
     nextEl: '.module_equipe_next',
     prevEl: '.module_equipe_prev',
   },
      loop:true,
      autoplay: {
    delay: 5000,
  },
  });

  var swiper_equipe_portraits = new Swiper('.swiper_equipe_portraits', {
      speed: 800,
      spaceBetween: 0,
      //effect:"fade",
      loop:true
  });
  /* link  swiper_min & swiper_pages */
  if(($('.swiper_equipe_portraits'))&&($('.swiper_equipe_verbatims'))){
    swiper_equipe_verbatims.controller.control = swiper_equipe_portraits;
  }
}


/* scrolling functions */

function init_ContentScrollFx() {

  var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    console.log('init_ContentScrollFx()');
    var apear_items = document.querySelectorAll(".appear_on_scroll");
    // var active_items = document.querySelectorAll(".active_on_scroll");
    var isScrolling = false;
 
    function throttleScroll(e) {
        console.log("scrolling");
        if (isScrolling == false) {
            window.requestAnimationFrame(function() {
                scrolling(e);
                if(window.innerWidth>660){ Paralax(); }  
                isScrolling = false;
            });
        }
        isScrolling = true;
    }

    function scrolling(e) {
        for (var n = 0; n < apear_items.length; n++) {
            var apear_item = apear_items[n];
            if (isPartiallyVisible(apear_item)) {
                apear_item.classList.add("appear");
            } else {
                apear_item.classList.remove("appear");
            }
        }
    }

    function isPartiallyVisible(el) {

        var elementBoundary = el.getBoundingClientRect();
        var top = elementBoundary.top;
        var bottom = elementBoundary.bottom;
        var height = elementBoundary.height;
        return ((top + height >= 0) && (height + window.innerHeight >= bottom));
        // return ((top + height >= 0) && (height + document.getElementById("main_content").innerHeight >= bottom));
    }

    /* parallax fx */

    var yScrollPosition;
    var parent_y;
    var parallax_01 = document.querySelectorAll(".parallax_01");
    var parallax_m01 = document.querySelectorAll(".parallax_m01");
    var parallax_photo_header = document.querySelectorAll(".parallax_photo_header");

    function setTranslate(xPos, yPos, el) {
        el.style.transform = "translate3d(" + xPos + ", " + yPos + "px, 0)";
    }

    function Paralax() {

        yScrollPosition = window.scrollY ;

        for( i=0; i < parallax_m01.length; i++ ) {
          setTranslate(0, yScrollPosition * .1, parallax_m01[i]);
        };

        for( i=0; i < parallax_photo_header.length; i++ ) {
          parent_y =   getPosition(parallax_photo_header[i].offsetParent.offsetParent).y;
          setTranslate(0, parent_y * -.3, parallax_photo_header[i]);
        };


    }

    throttleScroll();
    window.addEventListener("scroll", throttleScroll, false); 
}


function getPosition(el) {
  var xPos = 0;
  var yPos = 0;

  while (el) {
    if (el.tagName == "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      var yScroll = el.scrollTop || document.documentElement.scrollTop;

      xPos += (el.offsetLeft - xScroll + el.clientLeft);
      yPos += (el.offsetTop - yScroll + el.clientTop);
    } else {
      // for all other non-BODY elements
      xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPos += (el.offsetTop - el.scrollTop + el.clientTop);
    }

    el = el.offsetParent;
  }
  return {
    x: xPos,
    y: yPos
  };
}
