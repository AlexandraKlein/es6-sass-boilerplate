import './jquery-global.js';
import Barba from 'barba.js';
import scrollify from 'jquery-scrollify';
import Snap from 'snapsvg';
import slick from 'slick-carousel';


const $document = $(document);
const $body = $('body');


export default class ScrollEvents {
  constructor() {
    this.initPageTransitions();
    this.initScollify();
    this.initMorphEls();
    this.initSlickCarousel();
  }

  initPageTransitions() {
    const Homepage = Barba.BaseView.extend({
      namespace: 'home',
      onEnter: function onEnter() {
        $document.trigger('homepageOnEnter');
        $body.addClass('home');
        $body.attr('id', 'home');
      },
      onEnterCompleted: function onEnterCompleted() {
        $document.trigger('homepageOnEnterCompleted');
        $body.removeClass().addClass('home');
      },
      onLeave: function onLeave() {
        $document.trigger('homepageOnLeave');
      },
      onLeaveCompleted: function onLeaveCompleted() {
        $document.trigger('homepageOnLeaveCompleted');
      }
    });

    const Work = Barba.BaseView.extend({
      namespace: 'work',
      onEnter: function onEnter() {
        $document.trigger('workOnEnter');
        $body.addClass('work');
        $body.attr('id', 'work');
      },
      onEnterCompleted: function onEnterCompleted() {
        $document.trigger('workOnEnterCompleted');
        $body.removeClass().addClass('work');
      },
      onLeave: function onLeave() {
        $document.trigger('workOnLeave');
      },
      onLeaveCompleted: function onLeaveCompleted() {
        $document.trigger('workOnLeaveCompleted');
      }
    });

    const About = Barba.BaseView.extend({
      namespace: 'about',
      onEnter: function onEnter() {
        $document.trigger('aboutOnEnter');
        $body.addClass('about');
        $body.attr('id', 'about');
      },
      onEnterCompleted: function onEnterCompleted() {
        $document.trigger('aboutOnEnterCompleted');
        $body.removeClass().addClass('about');
      },
      onLeave: function onLeave() {
        $document.trigger('aboutOnLeave');
      },
      onLeaveCompleted: function onLeaveCompleted() {
        $document.trigger('aboutOnLeaveCompleted');
      }
    });

    const Contact = Barba.BaseView.extend({
      namespace: 'contact',
      onEnter: function onEnter() {
        $document.trigger('contactOnEnter');
        $body.addClass('contact');
        $body.attr('id', 'contact');
      },
      onEnterCompleted: function onEnterCompleted() {
        $document.trigger('contactOnEnterCompleted');
        $body.removeClass().addClass('contact');
      },
      onLeave: function onLeave() {
        $document.trigger('contactOnLeave');
      },
      onLeaveCompleted: function onLeaveCompleted() {
        $document.trigger('contactOnLeaveCompleted');
      }
    });

    $document.on('homepageOnEnterCompleted workOnEnterCompleted aboutOnEnterCompleted contactOnEnterCompleted', ()=> {
      $document.trigger('allPagesEnterCompleted');
    });

    Homepage.init();
    Work.init();
    About.init();
    Contact.init();

    Barba.Pjax.start();
    Barba.Prefetch.init();

    const speed = 750;

    const transition = Barba.BaseTransition.extend({
      start: function start() {
        Promise.all([this.newContainerLoading, this.transitionOut()]).then(this.transitionIn.bind(this));
      },
      transitionOut: function transitionOut() {
        const $elOld = $(this.oldContainer);

        $elOld.removeClass('transition-in').addClass('transition-out');

        setTimeout(() => $elOld.show().promise(), speed);
      },
      transitionIn: function transitionIn() {
        const _this2 = this;

        const _this = this;
        const $elNew = $(this.newContainer);

        setTimeout(() => {
          $(_this2.oldContainer).hide();
          $(_this2.oldContainer).show();
          _this.done();
        }, speed);

        $elNew.css({
          visibility: 'visible'
        });

        $elNew.addClass('transition-in').removeClass('transition-out');
      }
    });

    Barba.Pjax.getTransition = () => transition;

    Barba.Dispatcher.on('newPageReady', (currentStatus, oldStatus) => {
      $document.trigger('allPagesEnter');
    });

    Barba.Dispatcher.on('initStateChange', (currentStatus) => {
      $document.trigger('initStateChange');
    });

    function removeLandingAnimation() {
      setTimeout(() => {
        $('.barba-container').removeClass('landing-animation');
      }, 2000);
    }

    removeLandingAnimation();

    $document.on('allPagesEnter', ()=> {
      removeLandingAnimation();
    });
  }

  initScollify() {
    const settings = {
      section : '.scroll-section',
      easing: 'easeOutExpo',
      scrollSpeed: 1000,
      scrollbars: false,
      setHeights: true,
      overflowScroll: false,
      updateHash: false,
      afterRender() {
        $('.scroll-section')
          .eq(0)
          .addClass('active');

        $('.pagination li')
          .eq(0)
          .addClass('active');
      },
      before(i, panels) {

        const ref = panels[i].attr('data-section-name');
        const classes = 'active previous next';
        const videoWrapper = $('.video-wrapper');
        const btnPlayPause = $('#play-pause-button');
        const video = videoWrapper.find('video').get(0);

        if (videoWrapper.length) {
          video.pause();

          if (video.paused || video.ended) {
            videoWrapper.removeClass('playing');
            btnPlayPause.removeClass().addClass('play').attr('title', 'play');
          }
        }

        $('.pagination .active')
          .removeClass('active');

        $('.pagination')
          .find(`a[href="#${ref}"]`)
          .addClass('active');

        function removeAddClasses(args) {
          args.el.removeClass(classes)
            .addClass(args.classToAdd)
            .siblings('.scroll-section')
            .removeClass(args.classToAdd);
        }

        const removeAddClassesArray = [
          { el: $('.scroll-section').eq(i), classToAdd: 'active'},
          { el: $('.scroll-section').eq(i - 1), classToAdd: 'previous'},
          { el: $('.scroll-section').eq(i + 1), classToAdd: 'next'}
        ];

        if (!$('body').hasClass('contact')) {
          for (let index = 0; index < removeAddClassesArray.length; index++) {
            removeAddClasses(removeAddClassesArray[index]);
          }
        }

        if (i === panels.length - 1) {
          $('.arrow-down').addClass('disabled');
        } else if (i === 0) {
          $('.arrow-up').addClass('disabled');
        } else {
          $('.arrow-up, .arrow-down').removeClass('disabled');
        }
      }
    };

    function paginationArrowsMove() {

      $('.pagination a').toArray().forEach((el, i) => {
        $(el).click(e => {
          e.preventDefault();
          $.scrollify.move(i);
        });
      });

      $('.arrow-down').click(() => $.scrollify.next());

      $('.arrow-up').click(() => $.scrollify.previous());
    }

    $document.ready(() => {
      $.scrollify(settings);
      paginationArrowsMove();
    });

    $document.on('allPagesEnterCompleted', () => {
      $.scrollify.destroy();
      $.scrollify(settings);
      window.scrollTo(0, 0);
      $.scrollify.move(0);
      paginationArrowsMove();
    });
  }

  initMorphEls() {
    function morphEls() {
      console.log('morphels')
      function snapMorphHover(args) {
        const s = Snap(args.el);
        const path = s.select('path');

        const pathConfig = {
          toSpeed: args.toSpeed,
          fromSpeed: args.fromSpeed,
          from: path.attr('d'),
          to: args.el.getAttribute('data-morph-active')
        };

        args.el.addEventListener('mouseover', () => path.animate({ 'path': pathConfig.to }, pathConfig.toSpeed, args.easeIn));
        args.el.addEventListener('mouseout', () => path.animate({ 'path': pathConfig.from }, pathConfig.fromSpeed, args.easeOut));
      }

      const snapElsUpDown = [
        {el: document.querySelector('.arrow-up'), easeIn: mina.easein, easeOut: mina.easeout, toSpeed: 300, fromSpeed: 150},
        {el: document.querySelector('.arrow-down'), easeIn: mina.easein, easeOut: mina.easeout, toSpeed: 300, fromSpeed: 150}
      ];

      const snapElsLeftRight = [
        {el: document.querySelector('.arrow-next'), easeIn: mina.easein, easeOut: mina.bounce, toSpeed: 300, fromSpeed: 500},
        {el: document.querySelector('.arrow-prev'), easeIn: mina.easein, easeOut: mina.bounce, toSpeed: 300, fromSpeed: 500}
      ];

      if ($('body').hasClass('home') || $('body').hasClass('work') || $('body').hasClass('about')) {
        for (let i=0; i<snapElsUpDown.length; i++) {
          snapMorphHover(snapElsUpDown[i]);
        }
      }

      if ($('body').hasClass('work')) {
        for (let i=0; i<snapElsLeftRight.length; i++) {
          snapMorphHover(snapElsLeftRight[i]);
        }
      }
    }

    $(() => morphEls());

    $document.on('allPagesEnterCompleted', () => {
      setTimeout( ()=>  morphEls())
    });
  }

  initSlickCarousel() {
   function slickCarousel() {
     $('.carousel').slick({
       dots: true,
       infinite: true,
       variableWidth: true,
       slidesToShow: 1,
       prevArrow: $('.arrow-prev'),
       nextArrow: $('.arrow-next')
     });

     $('.slick-active').addClass('active');

     $('.carousel').on('afterChange', function() {
       $(this).find('.slide.slick-active').addClass('animate')
         .siblings().removeClass('animate');

       $(this).find('.slide').removeClass('open')
         .find('.btn .text').text('Learn More');
     });

     $('.carousel .slick-active').addClass('animate');

     $('.carousel .slide').toArray().forEach(el => {
       const $el = $(el);
       const $btn = $el.find('.btn');

       $btn.click(() => {
         let buttonText = $el.hasClass('open') ? 'Learn More' : 'Back';
         $el.toggleClass('open');
         $btn.find('.text').text(buttonText);
       });
     });
   }

   $(() => {
     if ($body.hasClass('work')) {
       slickCarousel();
     }
   });

   $document.on('workOnEnter', () => {
     slickCarousel();
   });

  }
}
